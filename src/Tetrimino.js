
class Block {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class Tetrimino {
    constructor(type){
        this.color = type;
        this.rotate = 0;
        this.block = [];
        this.isLanded = false;
        this.createMino(this.color);
    }

    createMino(type){
        let blockOffset = START_PLACE;
        switch(type){
            // Push these offsets into array so that this code can be shrinked.
            case 0:
                for(let i = 0; i<4; ++i){
                    this.block.push({"x":blockOffset.x + I_MINO[0][i].x, "y":blockOffset.y + I_MINO[0][i].y});
                }
                break;
            case 1:
                this.block.push(new Block(3, 0));
                for(let i = 3; i<6; ++i) this.block.push(new Block(i, 1));
                break;
            case 2:
                this.block.push(new Block(4, 0));
                this.block.push(new Block(5, 0));
                this.block.push(new Block(5, 1));
                this.block.push(new Block(6, 1));
                break;
            case 3:
                this.block.push(new Block(5, 0));
                this.block.push(new Block(5, 1));
                this.block.push(new Block(6, 0));
                this.block.push(new Block(6, 1));
                break;
            case 4:
                this.block.push(new Block(4, 1));
                this.block.push(new Block(5, 0));
                this.block.push(new Block(5, 1));
                this.block.push(new Block(6, 1));
                break;
            case 5:
                this.block.push(new Block(6, 0));
                this.block.push(new Block(4, 1));
                this.block.push(new Block(5, 1));
                this.block.push(new Block(6, 1));
                break;
            case 6:
                this.block.push(new Block(5, 0));
                this.block.push(new Block(5, 1));
                this.block.push(new Block(4, 1));
                this.block.push(new Block(6, 0));
                break;
        }
        return this;
    }

    checkMinoLand (board){
        for(let i = 0; i<4; ++i){
            if(this.block[i].y == BOARD_HEIGHT - 1 || board[this.block[i].y + 1][this.block[i].x] > -1){
                return true;
            }
        }
        return false;
    }

    moveMino(board){
        let movable =true;
        for(let i = 0; i<this.block.length; ++i){
            if(this.block[i].y + 1 > BOARD_HEIGHT - 1 || board[this.block[i].y + 1][this.block[i].x] != -1){
                movable = false;
            }
        }
        for(let i = 0; i<this.block.length && movable; ++i){
            this.block[i].y++;
        }
        return this;
    }

    rotateMino(board){

    }
}