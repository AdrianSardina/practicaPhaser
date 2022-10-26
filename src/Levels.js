export class Levels extends Phaser.Scene{
    
    keys=['greenBrick','orangeBrick','blueBrick','yellowBrick','pinkBrick'];
    
    constructor( scene)
   
    {
        super({ key: 'levels' });
        this.relatedScene = scene;
    }

    CreateLevelOne()
    {
      var block =   this.relatedScene.physics.add.staticGroup({
            key: this.keys,
            repeat: 7,
            gridAlign:
            {
                width: 10,
                height: 4,
                cellWidth: 67,
                cellHeight: 34,
                x: 100,
                y: 70
               
            }
            
            

        });
        
        return block
    }
    CreateLevelTwo()
    {
      var block = this.relatedScene.physics.add.staticGroup();
       var ind =1;
      for(var i=0;i<10;i++)
      {
        for(var j=0;j<ind;j++)
        {
            var bloq =block.create(40 +j*70, 60 +i*40, this.keys[0]);
        }
        ind ++;
      }
      
        
        return block
    }
}