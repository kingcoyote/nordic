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
            },
            {
                type : 'node',
                node : 'environment/Tree',
                params: { type:3 },
                z: 1,
                position : { x:300, y:100 }
            }
        ],
        position : { 
            x: 0,
            y: 0
        },
        startPoint : {
            'default': { x: 200, y: 100 },
            'store' : { x:290,y:270 }
        },
        doors : {
            store : { x:278,y:326,width:45,height:50,zone:'store',name:'entrance' }
        }
    },
    store : {
        items : [
            {
                type: 'sprite',
                position: { x:-30, y:-10 },
                size: { width:700, height:500 },
                image:  '/resources/storeConcept.png' ,
                sandbag: [
                    { x:0,y:163,width:700,height:337 },
                    { x:480,y:0,width:217,height:162 },
                    { x:162,y:143,width:56,height:20 },
                    { x:0,y:0,width:160,height:140 },
                    { x:-10,y:0,width:700,height:10 }
                ],
                z: -1
            },
        ],
        position : { 
            x: 0,
            y: 0
        },
        startPoint : {
            'entrance' : { x: 308, y: 15 }
        },
        doors : {
            entrance : { x:308, y:0, width:68, height:10, zone:'main', name:'store' }
        },
        scrollable : false
    }
}
