import Phaser from "phaser";
class Arkanoid extends Phaser.Scene
{
    constructor(){
        super("principal")
    }
    score=null;
    platform = null;
    cursor = null;
    ball = null;
    Bricks = null;
    lives= null;
    currentLevel =null;

    //-----------------Functions---------//
    impactBrick(player,brick)
    {
    brick.disableBody(true,true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
    }

    impactPlatform( ball, platform){

        let relativeImpact = ball.x -platform.x;

        if(relativeImpact == 0) //Choco en el centro
        {
            ball.setVelocityX(Phaser.Math.Between(-5,5));
        }else  // Choco en la izquierda o derecha
        {
            ball.setVelocityX(15 *relativeImpact);
        }
    }
    newLevel(){
        this.Bricks = this.physics.add.staticGroup({
            key: ['greenBrick','orangeBrick','blueBrick','yellowBrick'],
            repeat: 2,
            gridAlign:
            {
                width: 5,
                height: 3,
                cellWidth: 67,
                cellHeight: 34,
                x: 250,
                y: 100
               
            }
            
            
        });
        this.physics.add.collider(this.ball, this.Bricks,this.impactBrick,null,this);
        
        this.ball.setData('glue', true);
        this.ball.x = this.platform.x;
        this.ball.y=536;
        this.ball.setVelocityY(0);
    }
     //-------------Preload-----------//
    preload(){
        this.load.image('fondo','../img/fondo.png');
        this.load.image('plattform','../img/plattform.png')
        this.load.image('ball','../img/ball.png')
        this.load.image('greenBrick','../img/blockGreen.png')
        this.load.image('orangeBrick','../img/blockOrange.png')
        this.load.image('blueBrick','../img/blockBlue.png')
        this.load.image('yellowBrick','../img/blockYellow.png')
    } 
        //-------------Create-----------// 
    create(){
        this.lives = 3;
        this.score=0;
        this.currentLevel=1;
        this.add.image(400,300,'fondo');
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.platform = this.physics.add.image(500,560,'plattform');
        this.platform.body.allowGravity =false;
        this.Bricks = this.physics.add.staticGroup({
            key: ['greenBrick','orangeBrick','blueBrick','yellowBrick'],
            repeat: 5,
            gridAlign:
            {
               
                width: 8,
                height: 3,
                cellWidth: 70,
                cellHeight: 34,
                x: 125,
                y: 100             
            }
            
            
        });
        var bomb = this.Bricks.create(500, 500, 'greenBrick');
        
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.platform.setCollideWorldBounds(true); 
        this.platform.body.allowGravity = false;
        this.platform.body.setImmovable(true);
        this.ball = this.physics.add.image(500,536,'ball').setScale(.3).refreshBody();
        this.ball.setBounce(1);
        this.ball.setCollideWorldBounds(true); 
        this.ball.setVelocity(Phaser.Math.Between(60, 150),0)
        this.ball.setData('glue', true);
        this.physics.add.collider(this.ball, this.platform,this.impactPlatform,null,this);
        this.physics.add.collider(this.ball, this.Bricks,this.impactBrick,null,this);
    }
         //-------------Update-----------//
    update(){

        if (this.cursors.left.isDown)
        {
            this.platform.setVelocityX(-500);     
        }
        else if (this.cursors.right.isDown)
        {
            this.platform.setVelocityX(500);       
        }
        else
        {
            this.platform.setVelocityX(0);           
        }
        if (this.ball.getData('glue')) {
            this.ball.setVelocityX(this.platform.body.velocity.x);
            }
            if (this.cursors.up.isDown) {
                if (this.ball.getData('glue')) {
                this.ball.setVelocity(-75, -300);
                this.ball.setData('glue', false);
                }
             }
           
        if(this.Bricks.countActive() == 0)
        {
            this.newLevel();
           
        }  
        if(this.ball.y >= 580 )
        {
            this.ball.disableBody(true,true);
        }   
    }
}
export default Arkanoid