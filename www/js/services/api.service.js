app.factory('APIService', function () {
    var orders = [];
    orders.push({
        order_id: 2354, fullname: "Rafique Mohammed", status: "waiting", total_amount: "645", items: [
            { itemname: "Chicken Tandoori", amount: "450", qty: "1",comment:"little spicy" },
            { itemname: "Coco cola", amount: "55", qty: "2",comment:"should be cold" },
            { itemname: "Briyani", amount: "140", qty: "8",comment:"" }
        ]
    });
    orders.push({
        order_id: 21234, fullname: "William", status: "inprocess", total_amount: "305", items: [
            { itemname: "Large Pizza", amount: "250", qty: "1",comment:"cheeze toppings" },
            { itemname: "Coco cola", amount: "55", qty: "2",comment:"should be cold" }
        ]
    });
    orders.push({
        order_id: 3343, fullname: "Selva Kumar", status: "waiting", total_amount: "895", items: [
            { itemname: "Large Pizza", amount: "250", qty: "1",comment:"cheeze toppings" },
            { itemname: "Chicken Tandoori", amount: "450", qty: "1",comment:"" },
            { itemname: "Coco cola", amount: "55", qty: "2",comment:"should be cold" },
            { itemname: "Briyani", amount: "140", qty: "8",comment:"" }
        ]
    });
    orders.push({
        order_id: 4637, fullname: "Sameer", status: "waiting", total_amount: "305", items: [
            { itemname: "Chicken mughalai", amount: "250", qty: "1",comment:"" },
            { itemname: "Coco cola", amount: "55", qty: "2",comment:"should be cold" }
        ]
    });
    orders.push({
        order_id: 53245, fullname: "Satish", status: "waiting", total_amount: "895", items: [
            { itemname: "Large Pizza", amount: "250", qty: "1",comment:"cheeze toppings" },
            { itemname: "Chicken Tandoori", amount: "450", qty: "1",comment:"" },
            { itemname: "Coco cola", amount: "55", qty: "2",comment:"should be cold" },
            { itemname: "Briyani", amount: "140", qty: "8",comment:"" }
        ]
    });
    orders.push({
        order_id: 62354, fullname: "Rafique Mohammed", status: "waiting", total_amount: "645", items: [
            { itemname: "Chicken Tandoori", amount: "450", qty: "1",comment:"" },
            { itemname: "Coco cola", amount: "55", qty: "2",comment:"should be cold" },
            { itemname: "Briyani", amount: "140", qty: "8",comment:"" }
        ]
    });
    orders.push({
        order_id: 73245, fullname: "William", status: "inprocess", total_amount: "305", items: [
            { itemname: "Large Pizza", amount: "250", qty: "1",comment:"cheeze toppings" },
            { itemname: "Coco cola", amount: "55", qty: "2",comment:"should be cold" }
        ]
    });
    orders.push({
        order_id: 8245, fullname: "Selva Kumar", status: "waiting", total_amount: "895", items: [
            { itemname: "Large Pizza", amount: "250", qty: "1",comment:"cheeze toppings" },
            { itemname: "Chicken Tandoori", amount: "450", qty: "1",comment:"" },
            { itemname: "Coco cola", amount: "55", qty: "2",comment:"should be cold" },
            { itemname: "Briyani", amount: "140", qty: "8",comment:"" }
        ]
    });
    orders.push({
        order_id: 9245, fullname: "Sameer", status: "waiting", total_amount: "300", items: [
            { itemname: "Chicken mughalai", amount: "250", qty: "1",comment:"" },
            { itemname: "Coco cola", amount: "50", qty: "2",comment:"" }
        ]
    });
    orders.push({
        order_id: 10353, fullname: "Satish", status: "waiting", total_amount: "55", items: [
            { itemname: "Coco cola", amount: "55", qty: "2",comment:"" }
        ]
    });


    return {
        getOrders: function () {
            return orders;
        },
        getOrder: function (order_id,callback) {
            
            angular.forEach(orders, function (v, k) {
                if (order_id == v.order_id) {
                        callback(v);

                    }
                

            });
            
        }
    };

});