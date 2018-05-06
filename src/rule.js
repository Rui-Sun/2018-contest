// 将计数简化为1-11
class Rule {
    constructor(endCallback) {
        // 结束时的回调函数，传入移动步数
        if (endCallback) this._endCallback = endCallback;
        // flag:是否在游戏中，
        this._isPlaying = false;
        // flag:是否在动画中，在动画中停止交互
        this._isAnimating = false;
        // 总步数
        this._score = 0;
        // 数字池，使用key-value结构
        this._box = {};
    }

    // 初始化游戏
    init() {
        // 所有位置置零
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                this._box[`${i}${j}`] = 0;
            }
        }

        // 设置最初两个数字
        this._setNum(this._getRandomPosi(), this._get1Or2());
        this._setNum(this._getRandomPosi(), this._get1Or2());

        // 游戏开始
        this._isPlaying = true;
        this._isAnimating = false;
    }

    _getKey(dir, i, j) {
        if (dir === 1) {
            return `${i}${j}`;
        } else if (dir === 0) {
            return `${j}${i}`;
        } else if (dir === 2) {
            return `${3 - j}${i}`;
        } else if (dir === 3) {
            return `${i}${3 - j}`;
        }
    }

    // 移动，0123对应方向上左下右
    move(dir) {
        // 游戏结束或正在动画中不移动
        if (!this._isPlaying || this._isAnimating) return;

        let gameEndFlag = false;

        for (let i = 0; i < 4; i++) {
            const tempArr = [];
            const resultArr = [];
            for (let j = 0; j < 4; j++) {
                if (this._getNum(this._getKey(dir, i, j)) !== 0) {
                    tempArr.push(this._getNum(this._getKey(dir, i, j)));
                }
            }

            for (let k = 0; k < tempArr.length; k++) {
                if (tempArr[k] === 0) {
                    continue;
                } else if (tempArr[k + 1] && tempArr[k] === tempArr[k + 1]) {
                    tempArr[k]++;
                    this._score += Math.pow(2, tempArr[k]);
                    tempArr[k + 1] = 0;
                    resultArr.push(tempArr[k]);
                } else {
                    resultArr.push(tempArr[k]);
                }
            }

            for (let m = 0; m < 4; m++) {
                if (resultArr[m]) {
                    this._setNum(this._getKey(dir, i, m), resultArr[m]);
                    if (resultArr[m] === 11) gameEndFlag = true;
                } else {
                    this._setNum(this._getKey(dir, i, m), 0);
                }
            }
        }

        this._setNum(this._getRandomPosi(), this._get1Or2());
        if (gameEndFlag) this._end();
    }

    // 设置动画状态
    setIsAnimating(bool) {
        if (typeof (bool) === 'boolean') this._isAnimating = bool;
        return this;
    }

    getScore() {
        return this._score;
    }

    // 游戏结束
    _end() {
        this._isPlaying = false;
        this._endCallback(this._score);
        return this;
    }

    // 获取数字
    _getNum(posi) {
        return this._box[posi];
    }

    // 设置数字
    _setNum(posi, num) {
        this._box[posi] = num;
    }

    // 在空白的位置中随机取一个，供新增数字；若没有空白位置，游戏结束
    _getRandomPosi() {
        const posiArr = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this._box[`${i}${j}`] === 0) posiArr.push(`${i}${j}`);
            }
        }
        if (!posiArr.length) {
            this._end();
        } else {
            return posiArr[Math.floor(posiArr.length * Math.random())];
        }
    }

    // 生成一个1或2
    _get1Or2() {
        return Math.floor(Math.random() + 1.5);
    }
}