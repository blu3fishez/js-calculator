class Canvas {
    constructor(){
        this.ctx = document.getElementById("mycanvas").getContext("2d");
        this.width = this.ctx.width;
        this.height = this.ctx.height;
    }

    init(){
        this.fillRect(0, 0, CANVAS_RIGHT, CANVAS_BOTTOM, "rgb(245,245,245)");
        for(let i = 0; i<CANVAS_BOTTOM; i += 30){
            for(let j = 0; j<CANVAS_WIDTH; j += 30){
                this.fillRect(j, i, j+30, i+30, "rgb(200, 200, 200)");
                this.fillRect(j + 1, i + 1, j + 29, i+29, "rgb(245, 245, 245)");
            }
        }
    }

    fillRect(x1, y1, x2, y2, color){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x1, y1, x2-x1, y2-y1);
        this.ctx.fill();
        return this;
    }

    fillChunk(x, y, color){
        x *= 30;
        y *= 30;
        this.fillRect(x, y, x + 30, y + 30, "rgb(200, 200, 200)");
        let colorString = "rgb(245,245,245)";
        switch(color){
            case -1:
                break;
            case 0: // I-Mino
                colorString = "rgb(0, 255, 255)";
                break;
            case 1: // L-Mino
                colorString = "rgb(66, 0, 255)";
                break;
            case 2: // Z-Mino
                colorString = "rgb(255, 0, 0)";
                break;
            case 3: // Yellow Mino
                colorString = "rgb(255, 255, 0)";
                break;
            case 4: // T- Mino
                colorString = "rgb(167, 0, 255)";
                break;
            case 5: // reverse L-Mino
                colorString = "rgb(255, 167, 0)";
                break;
            case 6: // Reverse Z-Mino
                colorString = "rgb(0, 255, 0)";
                break;
        }
        this.fillRect(x + 1, y + 1, x + 29, y + 29, colorString);
        return this;
    }

    fillBoard(board){
        for(let i = 0; i<BOARD_HEIGHT; ++i){
            for(let j = 0; j<BOARD_WIDTH; ++j){
                this.fillChunk(j, i, board[i][j]);
            }
        }
        this.fill();
        return this;
    }

    fillHand(handMino){
        for(let i = 0; i<handMino.block.length; ++i){
            this.fillChunk(handMino.block[i].x, handMino.block[i].y, handMino.color);
        }
        this.fill();
        return this;
    }

    fill(){
        this.ctx.fill();
        return this;
    }
}