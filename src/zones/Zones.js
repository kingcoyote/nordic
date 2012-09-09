module.exports = {
    main : {
        items : [
            {
                position: { x:100, y:100 },
                size: { width:16, height:16 },
                image:  '/resources/box.png' ,
                sandbag: true
            },
            {
                position: { x:100, y:150 },
                size: { width:16, height:16 },
                image:  '/resources/box.png' ,
                sandbag: true
            },
            {
                position: { x:200, y:300 },
                size: { width:200, height:120 },
                image: '/resources/house.png',
                sandbag: true
            }
        ],
        position : { 
            x: 0,
            y: 0
        },
        startPoint : {
            x: 200,
            y: 100
        }
    }
}
