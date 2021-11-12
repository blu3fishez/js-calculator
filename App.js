const http = require('http');
const fs = require('fs').promises;

const app = http.createServer((req, res) => {
    try {
        if(req.url == '/') {
            const data = `<!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Tetris</title>
            </head>
            <body align="center">
                <canvas id="mycanvas" width=300 height=540 style="border:2px solid rgb(200, 200, 200)"></canvas>
                <p>Simple Tetris</p>
                <p id="score">Score : 0</p>
                <p>How to play?</p>
                <script src="src/const.js"></script>
                <script src="src/Canvas.js"></script>
                <script src="src/Tetrimino.js"></script>
                <script src="src/Board.js"></script>
                <script src="src/Main.js"></script>
            </body>
            </html>`;
            res.writeHead(200);
            return res.end(data);
        }
        else {
            const data = await fs.readFile(`${req.url}`);
            res.writeHead(200);
            return res.end(data);
        }
    }
    catch (e) {
        console.error(e);
    }
});

app.listen(8080, () => {
    console.log(`localhost 8080번 포트에서 대기중`);
})