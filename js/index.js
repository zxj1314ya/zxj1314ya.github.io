
 window.onload = function() {
    // 获取最外层大盒子
    var contentl = document.getElementsByClassName('contentl')[0]
    // 获取元素小盒子
    var wrapper = document.getElementsByClassName('wrapper')[0]
    // 获取 下面标记123456  的小圆圈
    var radius = document.getElementsByClassName('radius')[0]
    // 获取左右按钮
    var prev = document.getElementsByClassName('prev')[0]
    var next = document.getElementsByClassName('next')[0]
    // 获取图片的宽度
    var imgWidth = wrapper.children[0].offsetWidth
    // 设置首个 图片为 0
    var wrapIndex = 0

    //悬停显隐  鼠标放上去的时候   然后 
    contentl.onmouseover = function() {
        //  清除 一直滚动的计时器
        clearInterval(timer)
        // 让左右按钮变亮
        next.style.opacity = "0.6";
        prev.style.opacity = "0.6";
    }
    // 鼠标移出 
    contentl.onmouseout = function() {
        //设置计时器 让图片接着滚动
        timer = setInterval(function() {
            // 运行滚动函数
            next.onclick()
        }, 3500)
        // 让左右按钮变透明
        next.style.opacity = "0";
        prev.style.opacity = "0";
    }

    //动态创建圆点指示器
    function createLi() {
        // 循环几个图片
        for (let i = 0; i < wrapper.children.length - 1; i++) {
            // 设置  li 标签然后
            let li = document.createElement("li")
            li.innerHTML=i+1
            // 放到 dom里面
            radius.appendChild(li)
        }
        // 设置 现在 是第几个 图片 
        radius.children[0].className = 'radius-active'
    }
    // 运行函数
    createLi()

    //指示器响应
    function cirAction(wrapIndex) {
        // 循环  
        for (let i = 0; i < radius.children.length; i++) {
            // 删除所有当前 下面 123456   的  标记
            radius.children[i].classList.remove("radius-active")
        }
        if (wrapIndex === wrapper.children.length - 1) {
            // 找到当前指示器的 是第几张图片然后设置变亮
            radius.children[0].className = 'radius-active'
        } else {
            // 找到当前指示器的 是第几张图片然后设置变亮

            radius.children[wrapIndex].className = 'radius-active'
        }
    }

    //指示器控制
    function cirMouse() {
        // 循环  指示器
        for (let i = 0; i < radius.children.length; i++) {
            //鼠标放到  下面圆形按钮的时候
            radius.children[i].onmouseover = function() {
                // 清楚计时器
                clearInterval(timer);
                // 设置动画
                animate(wrapper, -i * imgWidth);
                // 让指示器的  指示 变道当前鼠标放的位置
                wrapIndex = i;
                // 然后  让图片滚动过去
                cirAction(wrapIndex)
            }
        }
    }
    cirMouse()

    //滑动动画
    function animate(el, target) {
        // 清除计时器
        clearInterval(el.timer)
        // 设置新的计时器
        el.timer = setInterval(function() {
            // 设置移动
            let move = 25;
            // 设置  图片移动多少
            let present = wrapper.offsetLeft;
            // 三目 运算符  判度图片是否到这个位置·
            move = present > target ? -move : move;
            present += move;
            // 下面是判度  没有的话接着 运动 到了的话就停止
            if (Math.abs(present - target) > Math.abs(move)) {
                wrapper.style.left = present + 'px'
            } else {
                clearInterval(el.timer);
                wrapper.style.left = target + 'px'
            }
        }, 16)
    }

    //next控制
    next.onclick = function() {
        // 判度现在是第几张图片 最后一张的时候   切换到第一张
        if (wrapIndex === wrapper.children.length - 1) {
            wrapIndex = 0;
            wrapper.style.left = 0 + 'px';
        }
        // 然后接着   让 设定的值  加1
        wrapIndex++;
        animate(wrapper, -wrapIndex * imgWidth);
        cirAction(wrapIndex);
    }

    //prev控制
    prev.onclick = function() {
        // 判度现在是第几张图片 第一张的时候切换到最后一张

        if (wrapIndex === 0) {
            wrapIndex = wrapper.children.length - 1;
            wrapper.style.left = -wrapIndex * imgWidth + 'px';
        }
         // 然后接着   让 设定的值 减一
        wrapIndex--;
        animate(wrapper, -wrapIndex * imgWidth);
        cirAction(wrapIndex)
    }

    //自动滑动  设定计时器 然后 自由滚动
    var timer = setInterval(function() {
        //   运行  滚动的函数
        next.onclick()
    }, 3500)
}