/**
 * Class to help on asset placement on the game screen
 */
export class AlignGrid {
    /**
     * Create a new AlignGrid
     */
    constructor(game, config) {
        if (!config.scene) {
            return;
        }
        if (!config.rows) {
            config.rows = 3;
        }
        if (!config.cols) {
            config.cols = 3;
        }
        if (!config.width) {
            config.width = game.config.width;
        }
        if (!config.height) {
            config.height = game.config.height;
        }
        this.h = config.height;
        this.w = config.width;
        this.rows = config.rows;
        this.cols = config.cols;
        //cw cell width is the scene width divided by the number of columns
        this.cw = this.w / this.cols;
        //ch cell height is the scene height divided the number of rows
        this.ch = this.h / this.rows;
        this.scene = config.scene;
    }

    /**
     * Place object in relation to the grid
     * @param {number} xx - x possiton
     * @param {number} yy - y possition
     * @param {object} obj - object to be placed
     */
    placeAt(xx, yy, obj) {
        //calculate the center of the cell
        //by adding half of the height and width
        //to the x and y of the coordinates
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        obj.x = x2;
        obj.y = y2;
    }

    /**
     * Debugging, create visual grid representation
     */
    show(a = 1) {
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(4, 0xff0000, a);
        for (var i = 0; i < this.w; i += this.cw) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.h);
        }
        for (var i = 0; i < this.h; i += this.ch) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.w, i);
        }
        this.graphics.strokePath();
    }

    /**
     * Place object in relation to the absolute square value
     * @param {number} index - square index number
     * @return {number} obj - object to be placed
     */
    placeAtIndex(index, obj) {
        var yy = Math.floor(index / this.cols);
        var xx = index - (yy * this.cols);
        this.placeAt(xx, yy, obj);
    }
    showNumbers(a = 1) {
        this.show(a);
        var n = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var numText = this.scene.add.text(0, 0, n, {
                    color: 'red'
                });
                numText.setOrigin(0.5, 0.5);
                this.placeAt(j, i, numText);
                n++;
            }
        }
    }

    /**
     * Get relative position from an absolute one
     * @param {number} node - Vertex to verify
     * @return {{number,number}} obj - coordinates of position
     */
    getIndexPos(index) {
        var yy = Math.floor(index / this.cols);
        var xx = index - (yy * this.cols);
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        var obj = {};
        obj.x = x2;
        obj.y = y2;
        return obj;
    }
}