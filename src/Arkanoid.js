import Phaser from "phaser";
class Arkanoid extends Phaser.Scene
{
    score=null;
    platform = null;
    cursor = null;
    ball = null;
    greenBricks = null;
    impactBrick(player,brick)
    {
    brick.disableBody(true,true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
    }
    impactPlatform(){

    }
    preload(){
        this.load.image('fondo','../img/fondo.png');
        this.load.image('plattform','../img/plattform.png')
        this.load.image('ball','../img/ball.png')
        this.load.image('greenBrick','../img/blockGreen.png')
        this.load.image('orangeBrick','../img/blockOrange.png')
    }
    create(){
        this.score=0;
        
        this.add.image(400,300,'fondo');
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.platform = this.physics.add.image(500,560,'plattform');
        this.platform.body.allowGravity =false;
        this.greenBricks = this.physics.add.group({
            key: ['greenBrick','orangeBrick'],
            repeat: 20,
            gridAlign:
            {
                width: 10,
                height: 6,
                cellWidth: 67,
                cellHeight: 34,
                x: 125,
                y: 100
               
            }
            
            
        });
        this.greenBricks.children.iterate(function (child) {
        
            child.body.allowGravity = false;
            child.body.setImmovable(true);
        });
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.platform.setCollideWorldBounds(true); 
        this.platform.body.allowGravity = false;
        this.platform.body.setImmovable(true);
        this.ball = this.physics.add.image(300,300,'ball').setScale(.3).refreshBody();
        this.ball.setBounce(1);
        this.ball.setCollideWorldBounds(true); 
        this.ball.setVelocity(Phaser.Math.Between(60, 150),500)
        this.physics.add.collider(this.ball, this.platform);
        this.physics.add.collider(this.ball, this.greenBricks,this.impactBrick,null,this);
    }
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
    }
}
export default Arkanoid