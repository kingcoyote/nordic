module.exports = {
    main : {
        items : [
            {
                type: 'sprite',
                position: { x:100, y:100 },
                size: { width:16, height:16 },
                image:  '/resources/box.png' ,
                sandbag: true,
                z: 5
            },
            {
                type : 'sprite',
                position: { x:100, y:150 },
                size: { width:16, height:16 },
                image:  '/resources/box.png' ,
                sandbag: true,
                z: 5
            },
            {
                type : 'sprite',
                position: { x:200, y:300 },
                size: { width:200, height:120 },
                image: '/resources/house.png',
                sandbag: [
                    {x:0,y:0,width:78,height:120},
                    {x:123,y:0,width:77,height:120},
                    {x:78,y:76,width:45,height:44},
                ],
                z: -1
            }
        ],
        position : { 
            x: 0,
            y: 0
        },
        startPoint : {
            'default': { x: 200, y: 100 },
            'house' : { x:290,y:270 }
        },
        doors : {
            house : { x:278,y:326,width:45,height:50,zone:'house',name:'entrance' }
        }
    },
    house : {
        items : [
            {
                type: 'sprite',
                position: { x:0, y:0 },
                size: { width:640, height:480 },
                image:  '/resources/houseInside.png' ,
                sandbag: [
                    { x:110,y:0,width:10,height:480 },
                    { x:520,y:0,width:10,height:480 },
                    { x:0,y:360,width:640,height:10 },
                    { x:0,y:80,width:295,height:40 },
                    { x:330,y:80,width:315,height:40 },
                    { x:0,y:70,width:640,height:20 }
                ],
                z: -1
            },
            {
                type : 'sprite',
                position: { x:200, y:200 },
                size: { width:16, height:16 },
                image:  '/resources/box.png' ,
                sandbag: true,
                z: 1
            }
        ],
        position : { 
            x: 0,
            y: 0
        },
        startPoint : {
            'entrance' : { x: 300, y: 130 }
        },
        doors : {
            entrance : { x:295, y:90, width:30, height:10, zone:'main', name:'house' }
        },
        scrollable : false
    }
}
