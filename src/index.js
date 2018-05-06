const rule = new Rule(() => {
    alert('end');
});

rule.init();

function flash() {
    for(let i = 0; i < 16; i++) {
        const text = Math.pow(2, rule._box[`${Math.floor(i / 4)}${Math.floor(i % 4)}`]);
        document.getElementById(`con-${i + 1}`).getElementsByClassName('number-text')[0].innerHTML = text !== 1 ? text : '';
        document.getElementById('score').innerHTML = rule.getScore();
    }
}

flash();

document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 38:
            rule.move(0);
            flash()
            break;
        case 37:
            rule.move(1);
            flash()
            break;
        case 39:
            rule.move(3);
            flash()
            break;
        case 40:
            rule.move(2);
            flash()
            break;
        default:
            break;
    }
});