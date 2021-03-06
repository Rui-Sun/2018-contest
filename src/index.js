// 添加规则
const rule = new Rule(() => {
    alert('end');
});

rule.init();

flash();

// 监听键盘
document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 38:
            move(0);
            break;
        case 37:
            move(1);
            break;
        case 39:
            move(3);
            break;
        case 40:
            move(2);
            break;
        default:
            break;
    }
});

// 刷新游戏界面，显示最新数字
function flash() {
    for (let i = 0; i < 16; i++) {
        const posiRow = Math.floor(i / 4);
        const posiCol = Math.floor(i % 4);
        const text = Math.pow(2, rule._box[`${posiRow}${posiCol}`]);

        // 每个数字复位
        const dom = document.getElementById(`con-${i + 1}`);
        dom.className = dom.className.replace(' number-container-transition', '');
        dom.style.top = posiRow * 125 + 'px';
        dom.style.left = posiCol * 125 + 'px';

        // 设置数字内容
        dom.getElementsByClassName('number-text')[0].innerHTML = text !== 1 ? text : '';
        document.getElementById('score').innerHTML = rule.getScore();
    }
}

// 移动，设置新位置，并判断是否结束
function move(dir) {
    const result = rule.move(dir);
    result.posiChange.forEach((item) => {
        const oldPosi = item[0].split('');
        const oldIndex = Number(oldPosi[0]) * 4 + Number(oldPosi[1]) + 1;
        const newPosi = item[1].split('');
        const dom = document.getElementById(`con-${oldIndex}`)
        dom.className = dom.className + ' number-container-transition';
        dom.style.top = newPosi[0] * 125 + 'px';
        dom.style.left = newPosi[1] * 125 + 'px';
    });
    rule.setIsAnimating(true);
    setTimeout(() => {
        flash();
        rule.setIsAnimating(false);
        if (result.isEnd) {
            alert('游戏结束！');
        }
    }, 210);
}