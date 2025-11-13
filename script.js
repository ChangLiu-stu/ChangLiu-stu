// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航条滚动效果
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '0.8rem 0';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '1.2rem 0';
        }
    });

    // 移动端菜单切换
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

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

// 照片加载错误处理函数
function handleImageError(img) {
    img.style.display = 'none';
    const placeholder = document.getElementById('photoPlaceholder');
    if (placeholder) {
        placeholder.style.display = 'flex';
    }
}

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
        { id: 'medical-imaging', name: '医学影像学', x: 50, y: 50, type: 'main', connections: ['imaging-tech', 'anatomy-systems', 'disease-diagnosis', 'image-analysis'] },
        { id: 'imaging-tech', name: '成像技术', x: 25, y: 25, type: 'category', connections: ['ct', 'mri', 'ultrasound', 'xray', 'nuclear'] },
        { id: 'ct', name: 'CT', x: 10, y: 15, type: 'tech', connections: [] },
        { id: 'mri', name: 'MRI', x: 20, y: 15, type: 'tech', connections: [] },
        { id: 'ultrasound', name: '超声', x: 30, y: 15, type: 'tech', connections: [] },
        { id: 'xray', name: 'X线', x: 10, y: 35, type: 'tech', connections: [] },
        { id: 'nuclear', name: '核医学', x: 20, y: 35, type: 'tech', connections: [] },
        { id: 'anatomy-systems', name: '解剖系统', x: 75, y: 25, type: 'category', connections: ['neuro', 'chest', 'abdomen', 'msk'] },
        { id: 'neuro', name: '神经系统', x: 65, y: 15, type: 'app', connections: [] },
        { id: 'chest', name: '胸部', x: 75, y: 15, type: 'app', connections: [] },
        { id: 'abdomen', name: '腹部', x: 85, y: 15, type: 'app', connections: [] },
        { id: 'msk', name: '骨骼肌肉', x: 70, y: 35, type: 'app', connections: [] },
        { id: 'disease-diagnosis', name: '疾病诊断', x: 25, y: 75, type: 'category', connections: ['tumors', 'inflammation', 'trauma', 'degenerative'] },
        { id: 'tumors', name: '肿瘤', x: 10, y: 85, type: 'process', connections: [] },
        { id: 'inflammation', name: '炎症', x: 20, y: 85, type: 'process', connections: [] },
        { id: 'trauma', name: '创伤', x: 30, y: 85, type: 'process', connections: [] },
        { id: 'degenerative', name: '退行性病变', x: 40, y: 85, type: 'process', connections: [] },
        { id: 'image-analysis', name: '影像分析', x: 75, y: 75, type: 'category', connections: ['image-processing', 'ai', 'quantitative'] },
        { id: 'image-processing', name: '图像处理', x: 65, y: 85, type: 'process', connections: [] },
        { id: 'ai', name: '人工智能', x: 75, y: 85, type: 'process', connections: [] },
        { id: 'quantitative', name: '定量分析', x: 85, y: 85, type: 'process', connections: [] }
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
                line.setAttribute("y2", toY");
                line.setAttribute("stroke", "rgba(74, 144, 226, 0.5)");
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
                    line.setAttribute("stroke", "rgba(74, 144, 226, 0.5)");
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
        { id: 'medical-imaging', x: 50, y: 10 },
        { id: 'imaging-tech', x: 25, y: 25 },
        { id: 'ct', x: 10, y: 40 },
        { id: 'mri', x: 20, y: 40 },
        { id: 'ultrasound', x: 30, y: 40 },
        { id: 'xray', x: 40, y: 40 },
        { id: 'nuclear', x: 50, y: 40 },
        { id: 'anatomy-systems', x: 75, y: 25 },
        { id: 'neuro', x: 65, y: 40 },
        { id: 'chest', x: 75, y: 40 },
        { id: 'abdomen', x: 85, y: 40 },
        { id: 'msk', x: 95, y: 40 },
        { id: 'disease-diagnosis', x: 25, y: 55 },
        { id: 'tumors', x: 10, y: 70 },
        { id: 'inflammation', x: 25, y: 70 },
        { id: 'trauma', x: 40, y: 70 },
        { id: 'degenerative', x: 55, y: 70 },
        { id: 'image-analysis', x: 75, y: 55 },
        { id: 'image-processing', x: 65, y: 70 },
        { id: 'ai', x: 75, y: 70 },
        { id: 'quantitative', x: 85, y: 70 }
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
        { id: 'medical-imaging', x: 50, y: 50 },
        { id: 'imaging-tech', x: 20, y: 30 },
        { id: 'ct', x: 5, y: 15 },
        { id: 'mri', x: 15, y: 15 },
        { id: 'ultrasound', x: 25, y: 15 },
        { id: 'xray', x: 35, y: 15 },
        { id: 'nuclear', x: 45, y: 15 },
        { id: 'anatomy-systems', x: 80, y: 30 },
        { id: 'neuro', x: 70, y: 15 },
        { id: 'chest', x: 80, y: 15 },
        { id: 'abdomen', x: 90, y: 15 },
        { id: 'msk', x: 100, y: 15 },
        { id: 'disease-diagnosis', x: 20, y: 70 },
        { id: 'tumors', x: 5, y: 85 },
        { id: 'inflammation', x: 20, y: 85 },
        { id: 'trauma', x: 35, y: 85 },
        { id: 'degenerative', x: 50, y: 85 },
        { id: 'image-analysis', x: 80, y: 70 },
        { id: 'image-processing', x: 70, y: 85 },
        { id: 'ai', x: 80, y: 85 },
        { id: 'quantitative', x: 90, y: 85 }
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
    const radius = 35;
    const nodes = [
        { id: 'medical-imaging' },
        { id: 'imaging-tech' },
        { id: 'ct' },
        { id: 'mri' },
        { id: 'ultrasound' },
        { id: 'xray' },
        { id: 'nuclear' },
        { id: 'anatomy-systems' },
        { id: 'neuro' },
        { id: 'chest' },
        { id: 'abdomen' },
        { id: 'msk' },
        { id: 'disease-diagnosis' },
        { id: 'tumors' },
        { id: 'inflammation' },
        { id: 'trauma' },
        { id: 'degenerative' },
        { id: 'image-analysis' },
        { id: 'image-processing' },
        { id: 'ai' },
        { id: 'quantitative' }
    ];
    
    nodes.forEach((node, index) {
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
        'medical-imaging': '医学影像学是利用各种成像技术对人体进行检查，从而对疾病进行诊断和治疗的一门临床学科。',
        'imaging-tech': '成像技术是医学影像学的核心，包括X线、CT、MRI、超声、核医学等多种成像方法。',
        'ct': 'CT（计算机断层扫描）利用X射线对人体进行断层扫描，通过计算机重建图像，能够清晰显示人体内部结构。',
        'mri': 'MRI（磁共振成像）利用强磁场和射频脉冲使人体组织产生信号，通过计算机重建图像，对软组织分辨率高。',
        'ultrasound': '超声成像利用超声波在人体组织中的反射和散射特性形成图像，无辐射、实时、便携。',
        'xray': 'X线成像利用X射线穿透人体不同组织的能力差异形成图像，是历史最悠久、应用最广泛的影像技术。',
        'nuclear': '核医学利用放射性核素标记的药物进行成像，能够显示器官功能和代谢状态。',
        'anatomy-systems': '解剖系统分类帮助医生根据不同的人体系统进行针对性的影像学检查和诊断。',
        'neuro': '神经影像学专注于脑、脊髓等神经系统疾病的影像诊断，如脑肿瘤、脑血管病、神经退行性疾病等。',
        'chest': '胸部影像学专注于肺、心脏、纵隔等胸部疾病的影像诊断，如肺癌、肺炎、心脏病等。',
        'abdomen': '腹部影像学专注于肝、胆、胰、脾、肾等腹部器官疾病的影像诊断。',
        'msk': '骨骼肌肉影像学专注于骨、关节、肌肉等运动系统疾病的影像诊断，如骨折、关节炎、软组织肿瘤等。',
        'disease-diagnosis': '疾病诊断是医学影像学的核心任务，通过对影像特征的分析判断疾病的性质和程度。',
        'tumors': '肿瘤影像诊断关注良恶性肿瘤的鉴别、肿瘤分期、疗效评估等。',
        'inflammation': '炎症影像诊断关注感染性和非感染性炎症的影像表现和鉴别诊断。',
        'trauma': '创伤影像诊断关注骨折、脏器损伤、出血等急性创伤的快速诊断。',
        'degenerative': '退行性病变影像诊断关注随着年龄增长出现的组织器官退行性改变的诊断。',
        'image-analysis': '影像分析是利用计算机技术对医学图像进行处理和分析，辅助医生进行诊断。',
        'image-processing': '图像处理技术包括图像增强、分割、配准等，能够改善图像质量并提取有用信息。',
        'ai': '人工智能在医学影像中的应用包括病灶检测、图像分割、辅助诊断等，正在改变传统影像诊断模式。',
        'quantitative': '定量分析通过测量影像中的各种参数，为疾病诊断和治疗评估提供客观依据。'
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