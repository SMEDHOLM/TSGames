type Point = {
  x: number;
  y: number;
};

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export class SnakeGame {
  private gridsize: number = 20;
  private gridamount: number = 20;
  private snake : Point []= [{x:10,y:10}];
  private direction : Direction = 'RIGHT';
  private ctx: CanvasRenderingContext2D;
  private food : Point = {x:5, y:5};
  private GameOver : boolean = false;
 

 constructor(ctx: CanvasRenderingContext2D) {
  this.ctx = ctx;
  this.SetupInput();
  this.SpawnFood();
 }
 private SpawnFood():void{
  this.food = {x: Math.floor(Math.random()*this.gridsize), y: Math.floor(Math.random()*this.gridsize)};

 }
 private SetupInput():void {
 window.addEventListener('keydown', (event: KeyboardEvent) => {
   const directions: Record<string, Direction> = {
     ArrowUp: 'UP',
     w: 'UP',
     ArrowDown: 'DOWN',
     s: 'DOWN',
     ArrowLeft: 'LEFT',
     a: 'LEFT',
     ArrowRight: 'RIGHT',
     d: 'RIGHT',
   };
   const direction = directions[event.key] ?? directions[event.key.toLowerCase()];

   if (direction) {
     if (event.key.startsWith('Arrow')) {
       event.preventDefault();
     }
     this.changeDirection(direction);
   }
 });
}

public changeDirection(direction: Direction): void {
 if (this.GameOver) {
   return;
 }

 const isOppositeDirection =
   (this.direction === 'UP' && direction === 'DOWN') ||
   (this.direction === 'DOWN' && direction === 'UP') ||
   (this.direction === 'LEFT' && direction === 'RIGHT') ||
   (this.direction === 'RIGHT' && direction === 'LEFT');

 if (!isOppositeDirection) {
   this.direction = direction;
 }
}

public reset(): void {
 this.snake = [{ x: 10, y: 10 }];
 this.direction = 'RIGHT';
 this.GameOver = false;
 this.SpawnFood();
}
  public draw(): void{
    this.ctx.fillStyle = '#403a3a'
    this.ctx.fillRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height)
    this.ctx.fillStyle = '#03f12f';
    for (const segment of this.snake){
      this.ctx.fillRect(segment.x * this.gridsize, segment.y * this.gridsize, this.gridsize -2, this.gridsize -2);
    }

    this.ctx.fillStyle = '#fc047c';
    this.ctx.fillRect(this.food.x * this.gridsize, this.food.y * this.gridsize, this.gridsize -2, this.gridsize -2)
    if (this.GameOver){
      this.ctx.fillStyle = '#0b0b0b'
      this.ctx.fillRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height)
      this.ctx.fillStyle = '#ff0000'
      this.ctx.font = '24px sans-serif';
      this.ctx.fillText("GAME OVER",135,200);
    }

    

  }
  public update() : void{
    if (this.GameOver){
      return;
    }
    const currentHead : Point = this.snake[0];
    const  newHead : Point = {x: currentHead.x, y : currentHead.y};
    if (this.direction ==='UP'){newHead.y--}
    if (this.direction === 'DOWN'){newHead.y++}
    if (this.direction === 'LEFT'){newHead.x--}
    if (this.direction === 'RIGHT'){newHead.x++}
    this.snake.unshift(newHead);
    if (this.food.x === newHead.x && this.food.y === newHead.y){this.SpawnFood()}
    else{
      this.snake.pop();
    }
    for (const segment of this.snake.slice(1)){
      if (newHead.x === segment.x && newHead.y === segment.y){
        this.GameOver =true;
        return;
      }
      
    }
    
    if (newHead.x >= this.gridamount  || newHead.x < 0 || newHead.y < 0 || newHead.y >= this.gridamount){
        this.GameOver = true;
        return;
      }
    


  }
}
