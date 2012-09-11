module.exports = {
    main : {
        items : [
            {
                position: { x:100, y:100 },
                size: { width:16, height:16 },
                image:  '/resources/box.png' ,
                sandbag: true,
                zOrder: 5
            },
            {
                position: { x:100, y:150 },
                size: { width:16, height:16 },
                image:  '/resources/box.png' ,
                sandbag: true,
                zOrder: 5
            },
            {
                position: { x:200, y:300 },
                size: { width:200, height:120 },
                image: '/resources/house.png',
                sandbag: [
                    {x:0,y:0,width:78,height:120},
                    {x:123,y:0,width:77,height:120},
                    {x:78,y:76,width:45,height:44},
                ],
                zOrder: -1
            }
        ],
        position : { 
            x: 0,
            y: 0
        },
        startPoint : {
            x: 200,
            y: 100
        },
        doors : {
            house : { x:278,y:326,width:45,height:50,zone:'house',name:'entrance' }
        }
    },
    house : {
        items : [
            {
                position: { x:200, y:200 },
                size: { width:16, height:16 },
                image:  '/resources/box.png' ,
                sandbag: true,
                zOrder: 5
            }
        ],
        position : { 
            x: 0,
            y: 0
        },
        startPoint : {
            x: 100,
            y: 200
        }
    }
}
