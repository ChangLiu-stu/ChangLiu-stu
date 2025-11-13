// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航条滚动效果
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'var(--primary-color)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '0.7rem 0';
        } else {
            navbar.style.background = 'var(--primary-color)';
            navbar.style.backdropFilter = 'none';
            navbar.style.padding = '1rem 0';
        }
    });

    // 移动端菜单切换
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // 深色模式切换
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // 检查本地存储的主题设置
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // 滚动显示动画
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 如果是技能条，触发动画
                if (entry.target.classList.contains('skill-category')) {
                    animateSkills();
                }
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // 关闭移动端菜单
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.textContent = '☰';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 返回顶部按钮
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 项目筛选
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新活动按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // 筛选项目
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 联系表单提交
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('感谢您的消息！我会尽快回复。');
        contactForm.reset();
    });

    // 生成知识图谱可视化
    createKnowledgeGraph();
    
    // 初始化技能条动画
    animateSkills();
});

// 技能条动画
function animateSkills() {
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        const width = level.getAttribute('data-level') + '%';
        level.style.width = width;
    });
}

// 创建知识图谱可视化
function createKnowledgeGraph() {
    const graphArea = document.getElementById('graphArea');
    
    // 清除现有内容
    graphArea.innerHTML = '';
    
    // 定义节点数据
    const nodes = [
        { id: 'mri', name: '磁共振成像', x: 50, y: 50, type: 'main', connections: ['sequences', 'applications', 'analysis'] },
        { id: 'sequences', name: '成像序列', x: 25, y: 25, type: 'category', connections: ['t1', 't2', 'dwi', 'flair'] },
        { id: 't1', name: 'T1加权', x: 10, y: 15, type: 'tech', connections: [] },
        { id: 't2', name: 'T2加权', x: 25, y: 15, type: 'tech', connections: [] },
        { id: 'dwi', name: '扩散加权', x: 40, y: 15, type: 'tech', connections: [] },
        { id: 'flair', name: 'FLAIR', x: 10, y: 35, type: 'tech', connections: [] },
        { id: 'applications', name: '临床应用', x: 75, y: 25, type: 'category', connections: ['neuro', 'cardio', 'musculo'] },
        { id: 'neuro', name: '神经影像', x: 65, y: 15, type: 'app', connections: [] },
        { id: 'cardio', name: '心血管成像', x: 80, y: 15, type: 'app', connections: [] },
        { id: 'musculo', name: '肌肉骨骼', x: 70, y: 35, type: 'app', connections: [] },
        { id: 'analysis', name: '数据分析', x: 50, y: 75, type: 'category', connections: ['reconstruction', 'quantitative', 'segmentation'] },
        { id: 'reconstruction', name: '图像重建', x: 35, y: 85, type: 'process', connections: [] },
        { id: 'quantitative', name: '定量分析', x: 50, y: 85, type: 'process', connections: [] },
        { id: 'segmentation', name: '图像分割', x: 65, y: 85, type: 'process', connections: [] }
    ];

    // 创建节点
    nodes.forEach(node => {
        const nodeElement = document.createElement('div');
        nodeElement.className = `graph-node ${node.type}`;
        nodeElement.textContent = node.name;
        nodeElement.style.left = `${node.x}%`;
        nodeElement.style.top = `${node.y}%`;
        nodeElement.setAttribute('data-id', node.id);
        
        // 使节点可拖动
        makeDraggable(nodeElement);
        
        // 添加点击事件
        nodeElement.addEventListener('click', function() {
            showNodeInfo(node);
        });
        
        graphArea.appendChild(nodeElement);
    });

    // 添加连线
    createConnections(nodes);
    
    // 添加图谱控制功能
    setupGraphControls();
}

// 创建节点间的连线
function createConnections(nodes) {
    const graphArea = document.getElementById('graphArea');
    
    // 创建SVG容器用于连线
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = "1";
    
    graphArea.appendChild(svg);
    
    // 绘制连线
    nodes.forEach(node => {
        if (node.connections && node.connections.length > 0) {
            const fromElement = document.querySelector(`.graph-node[data-id="${node.id}"]`);
            if (!fromElement) return;
            
            const fromRect = fromElement.getBoundingClientRect();
            const graphRect = graphArea.getBoundingClientRect();
            
            const fromX = fromRect.left - graphRect.left + fromRect.width / 2;
            const fromY = fromRect.top - graphRect.top + fromRect.height / 2;
            
            node.connections.forEach(connectionId => {
                const toElement = document.querySelector(`.graph-node[data-id="${connectionId}"]`);
                if (!toElement) return;
                
                const toRect = toElement.getBoundingClientRect();
                const toX = toRect.left - graphRect.left + toRect.width / 2;
                const toY = toRect.top - graphRect.top + toRect.height / 2;
                
                const line = document.createElementNS(svgNS, "line");
                line.setAttribute("x1", fromX);
                line.setAttribute("y1", fromY);
                line.setAttribute("x2", toX);
                line.setAttribute("y2", toY);
                line.setAttribute("stroke", "rgba(52, 152, 219, 0.5)");
                line.setAttribute("stroke-width", "2");
                
                svg.appendChild(line);
            });
        }
    });
    
    // 更新函数，当节点移动时重新绘制连线
    window.updateConnections = function() {
        // 清除现有连线
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }
        
        // 重新绘制所有连线
        nodes.forEach(node => {
            if (node.connections && node.connections.length > 0) {
                const fromElement = document.querySelector(`.graph-node[data-id="${node.id}"]`);
                if (!fromElement) return;
                
                const fromRect = fromElement.getBoundingClientRect();
                const graphRect = graphArea.getBoundingClientRect();
                
                const fromX = fromRect.left - graphRect.left + fromRect.width / 2;
                const fromY = fromRect.top - graphRect.top + fromRect.height / 2;
                
                node.connections.forEach(connectionId => {
                    const toElement = document.querySelector(`.graph-node[data-id="${connectionId}"]`);
                    if (!toElement) return;
                    
                    const toRect = toElement.getBoundingClientRect();
                    const toX = toRect.left - graphRect.left + toRect.width / 2;
                    const toY = toRect.top - graphRect.top + toRect.height / 2;
                    
                    const line = document.createElementNS(svgNS, "line");
                    line.setAttribute("x1", fromX);
                    line.setAttribute("y1", fromY);
                    line.setAttribute("x2", toX);
                    line.setAttribute("y2", toY);
                    line.setAttribute("stroke", "rgba(52, 152, 219, 0.5)");
                    line.setAttribute("stroke-width", "2");
                    
                    svg.appendChild(line);
                });
            }
        });
    };
}

// 使节点可拖动
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // 获取鼠标初始位置
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // 计算新位置
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // 设置元素新位置
        const newTop = (element.offsetTop - pos2) + "px";
        const newLeft = (element.offsetLeft - pos1) + "px";
        element.style.top = newTop;
        element.style.left = newLeft;
        element.style.transform = "none"; // 移除可能存在的变换效果
        
        // 更新连线
        if (window.updateConnections) {
            window.updateConnections();
        }
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// 设置图谱控制功能
function setupGraphControls() {
    const graphArea = document.getElementById('graphArea');
    let scale = 1;
    
    document.getElementById('zoomIn').addEventListener('click', function() {
        scale = Math.min(scale * 1.2, 3);
        graphArea.style.transform = `scale(${scale})`;
    });
    
    document.getElementById('zoomOut').addEventListener('click', function() {
        scale = Math.max(scale / 1.2, 0.5);
        graphArea.style.transform = `scale(${scale})`;
    });
    
    document.getElementById('resetView').addEventListener('click', function() {
        scale = 1;
        graphArea.style.transform = `scale(${scale})`;
        
        // 重置所有节点位置
        const nodes = document.querySelectorAll('.graph-node');
        nodes.forEach(node => {
            node.style.top = '';
            node.style.left = '';
            node.style.transform = '';
        });
        
        // 更新连线
        if (window.updateConnections) {
            window.updateConnections();
        }
    });
    
    // 布局功能
    document.getElementById('layoutVertical').addEventListener('click', function() {
        applyVerticalLayout();
    });
    
    document.getElementById('layoutHorizontal').addEventListener('click', function() {
        applyHorizontalLayout();
    });
    
    document.getElementById('layoutCircular').addEventListener('click', function() {
        applyCircularLayout();
    });
}

// 垂直布局
function applyVerticalLayout() {
    const nodes = [
        { id: 'mri', x: 50, y: 10 },
        { id: 'sequences', x: 25, y: 25 },
        { id: 't1', x: 10, y: 40 },
        { id: 't2', x: 25, y: 40 },
        { id: 'dwi', x: 40, y: 40 },
        { id: 'flair', x: 55, y: 40 },
        { id: 'applications', x: 75, y: 25 },
        { id: 'neuro', x: 65, y: 40 },
        { id: 'cardio', x: 75, y: 40 },
        { id: 'musculo', x: 85, y: 40 },
        { id: 'analysis', x: 50, y: 55 },
        { id: 'reconstruction', x: 35, y: 70 },
        { id: 'quantitative', x: 50, y: 70 },
        { id: 'segmentation', x: 65, y: 70 }
    ];
    
    nodes.forEach(node => {
        const element = document.querySelector(`.graph-node[data-id="${node.id}"]`);
        if (element) {
            element.style.left = `${node.x}%`;
            element.style.top = `${node.y}%`;
            element.style.transform = 'none';
        }
    });
    
    if (window.updateConnections) {
        window.updateConnections();
    }
}

// 水平布局
function applyHorizontalLayout() {
    const nodes = [
        { id: 'mri', x: 50, y: 50 },
        { id: 'sequences', x: 20, y: 30 },
        { id: 't1', x: 5, y: 15 },
        { id: 't2', x: 15, y: 15 },
        { id: 'dwi', x: 25, y: 15 },
        { id: 'flair', x: 35, y: 15 },
        { id: 'applications', x: 80, y: 30 },
        { id: 'neuro', x: 70, y: 15 },
        { id: 'cardio', x: 80, y: 15 },
        { id: 'musculo', x: 90, y: 15 },
        { id: 'analysis', x: 50, y: 70 },
        { id: 'reconstruction', x: 35, y: 85 },
        { id: 'quantitative', x: 50, y: 85 },
        { id: 'segmentation', x: 65, y: 85 }
    ];
    
    nodes.forEach(node => {
        const element = document.querySelector(`.graph-node[data-id="${node.id}"]`);
        if (element) {
            element.style.left = `${node.x}%`;
            element.style.top = `${node.y}%`;
            element.style.transform = 'none';
        }
    });
    
    if (window.updateConnections) {
        window.updateConnections();
    }
}

// 环形布局
function applyCircularLayout() {
    const centerX = 50;
    const centerY = 50;
    const radius = 30;
    const nodes = [
        { id: 'mri', angle: 0 },
        { id: 'sequences', angle: 45 },
        { id: 't1', angle: 90 },
        { id: 't2', angle: 135 },
        { id: 'dwi', angle: 180 },
        { id: 'flair', angle: 225 },
        { id: 'applications', angle: 270 },
        { id: 'neuro', angle: 315 },
        { id: 'cardio', angle: 0 },
        { id: 'musculo', angle: 45 },
        { id: 'analysis', angle: 90 },
        { id: 'reconstruction', angle: 135 },
        { id: 'quantitative', angle: 180 },
        { id: 'segmentation', angle: 225 }
    ];
    
    nodes.forEach((node, index) => {
        const element = document.querySelector(`.graph-node[data-id="${node.id}"]`);
        if (element) {
            const angle = (index / nodes.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            element.style.left = `${x}%`;
            element.style.top = `${y}%`;
            element.style.transform = 'none';
        }
    });
    
    if (window.updateConnections) {
        window.updateConnections();
    }
}

// 显示节点详细信息
function showNodeInfo(node) {
    const nodeInfo = {
        'mri': '磁共振成像（Magnetic Resonance Imaging, MRI）是一种利用核磁共振原理的医学影像技术，能够生成人体内部结构的详细图像。',
        'sequences': 'MRI成像序列是一系列射频脉冲和梯度磁场的组合，用于产生不同类型的组织对比度图像。',
        't1': 'T1加权成像突出显示解剖结构，脂肪组织显示为亮信号，水显示为暗信号。',
        't2': 'T2加权成像对水含量敏感，常用于检测水肿、炎症和某些病理变化。',
        'dwi': '扩散加权成像通过测量水分子扩散运动来评估组织微观结构，对急性脑缺血特别敏感。',
        'flair': 'FLAIR（Fluid Attenuated Inversion Recovery）序列抑制脑脊液信号，使邻近脑室的病变更加明显。',
        'applications': 'MRI广泛应用于神经、心血管、肌肉骨骼、腹部和盆腔等部位的临床诊断。',
        'neuro': '神经影像应用包括脑肿瘤、脑血管疾病、神经退行性疾病和发育异常等的诊断与评估。',
        'cardio': '心脏MRI可评估心脏结构、功能、灌注和 viability，对心肌病、先天性心脏病等有重要诊断价值。',
        'musculo': '肌肉骨骼MRI用于评估关节、肌肉、肌腱和韧带损伤，以及骨肿瘤和感染等疾病。',
        'analysis': 'MRI数据分析包括图像重建、后处理、定量参数提取和人工智能辅助诊断等。',
        'reconstruction': '图像重建是将原始k空间数据转换为可视图像的过程，常用方法包括傅里叶变换和压缩感知。',
        'quantitative': '定量MRI分析提取组织的物理和生理参数，如T1、T2弛豫时间、扩散系数和灌注参数等。',
        'segmentation': '图像分割是将图像划分为具有不同意义的区域，常用于器官、组织和病变的自动识别与定量分析。'
    };
    
    // 创建模态框显示详细信息
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '10000';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'var(--card-bg)';
    modalContent.style.padding = '2rem';
    modalContent.style.borderRadius = '10px';
    modalContent.style.maxWidth = '500px';
    modalContent.style.width = '90%';
    modalContent.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
    modalContent.style.position = 'relative';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '15px';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '1.5rem';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.color = 'var(--text-color)';
    
    const title = document.createElement('h3');
    title.textContent = node.name;
    title.style.color = 'var(--primary-color)';
    title.style.marginBottom = '1rem';
    
    const content = document.createElement('p');
    content.textContent = nodeInfo[node.id] || '详细信息正在更新中...';
    content.style.lineHeight = '1.6';
    
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(title);
    modalContent.appendChild(content);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
    
    // 关闭模态框
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}