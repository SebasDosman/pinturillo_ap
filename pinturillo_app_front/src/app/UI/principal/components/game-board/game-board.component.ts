import { CommonModule } from "@angular/common";
import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  HostListener
} from "@angular/core";
import { Router } from "@angular/router";
import { fromEvent } from "rxjs";
import { concatMap, pairwise, switchMap, takeUntil } from "rxjs/operators";
import { SocketGameService } from '../../services/socket-game.service';
import { StorageService } from "../../services/storage.service";
import { ToastService } from "../../services/toast.service";
import { GameDataService } from '../../services/game-data.service';

interface mouseMovement{
  pos: {x: number, y: number};
  pos_prev: {x: number, y: number} | null;
  color: string;
}

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements AfterViewInit {
  @ViewChild('canvas') public canvas!: ElementRef;

  // setting a width and height for the canvas
  @Input() public width = 400;
  @Input() public height = 400;
  namePlayerDrawing: string = '';

  tiempo: number = 0;
  intervalo: any;

  canvasEl !: HTMLCanvasElement;
  private cx!: CanvasRenderingContext2D | null;  
  public isCursorVisible: boolean = false;
  private mouseMove : mouseMovement = {
    pos: {x: 0, y: 0},
    pos_prev: null,
    color: 'black'
  }

  private restartMouseMovement(){
    this.mouseMove = {
      pos: {x: 0, y: 0},
      pos_prev: {x: 0, y: 0},
      color: 'black'
    }
  }

  constructor( private router: Router, private socketServ: SocketGameService, private storageServ: StorageService, private toastServ: ToastService, private gameServ: GameDataService) {
  }

  ngOnInit(): void {

    
    //this.iniciarCronometro();
    
  }

  public ngAfterViewInit() {
    // get the context
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');

    this.updateDimensions();
    this.startEvents( this.canvasEl )
  }

  private startEvents( canvasEl: any){


    if( !this.cx ) return 

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';

    canvasEl.width = this.width;
    canvasEl.height = this.height;
    
    this.getFromRoom();
    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              takeUntil(fromEvent(canvasEl, 'mouseleave')),  
              pairwise()
            )
        })
      )
      .subscribe((res: any) => {
        const rect = canvasEl.getBoundingClientRect();
        
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };
        
        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        this.mouseMove.pos_prev = prevPos;
        this.mouseMove.pos = currentPos;

        
        this.sendToRoom('DRAW_LINE')
      });
  }



  private drawOnCanvas(
    prevPos: { x: number, y: number }, 
    currentPos: { x: number, y: number }
  ) {
    if (!this.cx) { return; }
    this.cx.beginPath();

    if (prevPos) {
      
      this.cx.moveTo(prevPos.x, prevPos.y); 
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  private getFromRoom(){
    this.sendToRoom("DRAW_HISTORY")

    this.socketServ.$subject.subscribe( (message: any) => {
      try{
        
        if( message.includes("has started their") ){
          this.assignDrawer(message);
        }

        if( message.includes("You must draw: ") ){
          if( this.storageServ.compareNameFromStorage( this.namePlayerDrawing ) ) this.wordToDraw( message.split(":")[1].trim() );
        }

        const data = JSON.parse( message )
        if( data.type !== null ){
  
          if( data.type == 'DRAW_LINE'){
            this.cambiarColor( data.data.color );
            this.drawOnCanvas( data.data.pos_prev, data.data.pos);
          }
  
          if( data.type == 'BOARD_ERASE'){
            this.borrarSala()
          }
        }
      } catch(err: any){
      }
    })
  }

  wordToDraw(word: string){
    this.toastServ.showSuccess(`The word to draw is: ${word}`)
  }

  assignDrawer(message: string){
    this.namePlayerDrawing = message.split(" ")[0];
    this.borrarSala()

    this.tiempo = 0;
    this.iniciarCronometro()
    
    if( this.storageServ.compareNameFromStorage( this.namePlayerDrawing ) ){

      this.isCursorVisible = true;
    } else{

      this.toastServ.showSuccess(`The player ${this.namePlayerDrawing} has started their turn!`)
      this.isCursorVisible = false;
    }
  }

  sendToRoom(type: string){
    if( this.mouseMove.pos_prev ) {
      this.socketServ.sendMessage( JSON.stringify( { type , data: this.mouseMove } ))
    }
  }

  cambiarColor( color: string){
    if( !this.cx ) return 
    this.cx.strokeStyle = color;
    this.mouseMove.color = this.cx.strokeStyle;
  }

  borrarSala(){
    if( !this.cx ) return 
    this.cx.clearRect(0, 0, this.width, this.height);
  }

  borrar(){
    if( !this.cx ) return 

    this.mouseMove.pos_prev = { x: 0, y: 0 };
    this.mouseMove.pos = { x: 0, y: 0 };
    this.sendToRoom('BOARD_ERASE')
    this.cx.clearRect(0, 0, this.width, this.height);
  } 

  iniciarCronometro(): void {
    this.intervalo = setInterval(() => {

      if (this.tiempo < 100) {
        this.tiempo++;

        if( this.tiempo % 3 == 0){
          let dividir = (this.tiempo )
          this.gameServ.setPointsToSum( 5000 / this.tiempo );
        }
      } else {

        this.tiempo = 0;
        this.socketServ.sendMessage( JSON.stringify( { type: 'FINISH_TURN'} ))
        clearInterval(this.intervalo);
      }
    }, 1000);
  }


  getBack(){
    this.router.navigate(['home']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateDimensions();
  }

  private updateDimensions(): void {
    
    if (this.canvas) {
      
      const { offsetWidth, offsetHeight } = this.canvas.nativeElement;
      this.width = offsetWidth;
      this.height = offsetHeight;

      this.canvasEl.width = this.width;
      this.canvasEl.height = this.height;

      this.mouseMove.pos_prev = { x: 0, y: 0 };
      this.sendToRoom('DRAW_HISTORY')
    }
  }
}

