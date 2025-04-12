import anhgif from './assets/anh/gift.png'
import anhlock from './assets/anh/lock.png'
import anhad from './assets/anh/address.png'
import anhpay from './assets/anh/pay.png'
import anhpaypal from './assets/anh/paypal.png'
import anhama from './assets/anh/ama.jpg'










const Myac = [
    {
        key: 1,
        propssanh: anhgif,
        propsname: 'Your Orders',
        propsmota: 'Track, return, or buy things again',
        propstc: 'Gold & Diamond Jewellery',
        propst: 'Apps and more',
        propstt: 'Content and devices',
        propsttt: 'Music settings'
    },
    {
        key: 2,
        propssanh: anhlock,
        propsname: 'Login & security',
        propsmota: 'Edit login, name, and mobile number',
        propstc: 'Handloom & Handicraft Store',
        propst: 'Advertising preferences',
        propstt: 'Communication preferences',
        propsttt: 'SMS alert preferences'
    },
    {
        key: 3,
        propssanh: anhad,
        propsname: 'Your Addresses',
        propsmota: 'Edit addresses for orders and gifts',
        propstc: 'The Designer Boutique',
        propst: 'Amazon Pay',
        propstt: 'Bank accounts for refunds',
        propsttt: 'Coupons'
    },
    {
        key: 4,
        propssanh: anhpay,
        propsname: 'Payment options',
        propsmota: 'Edit or add payment methods',
        propstc: 'Gift Boxes, Gift Tags',
        propst: 'Leave delivery feedback',
        propstt: 'Lists',
        propsttt: 'Photo ID proofs'
    },
    {
        key: 5,
        propssanh: anhpaypal,
        propsname: 'PayPal',
        propsmota: 'View benefits and payment settings',
        propstc: 'Other accounts',
        propst: 'Amazon Business registration',
        propstt: 'Seller account',
        propsttt: 'Amazon Web Services'
    },
    {
        key: 6,
        propssanh: anhama,
        propsname: 'Amazon Pay balance',
        propsmota: 'Add money to your balance',
        propstc: 'Shopping programs and rentals',
        propst: 'Subscribe & Save',
        propstt: 'Profile',
        propsttt: 'Message center'
    }
];
const Gallerryanh = [
    {
        id: 1, img:'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458179/tlrfvs5vrrxxc82zfcga.jpg',
        category: "Bulbs",
        imga:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458183/xgfuzokcgysbkry6fbrp.jpg' ,
        imgb:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458185/rahjual6ztcbozdpk8ct.jpg' ,
        name: 'Cây không khí',
        giacu:'$5.79',
        gia:3.00,
        quantity: 1,
        propmota:'Cây không khí là loại cây trồng độc đáo mới lạ du nhập vào Việt Nam vài năm gần đây. Cây được nhiều người bán quảng cáo là không cần đất trồng và phân bón, cùng tìm hiểu thực hư thông tin về loại cây này nhé?'
    },
    {
        id: 2,
        img:'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458193/b0goftun2bqriweefdwi.jpg',
        category: "Fruits",
        imga:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458185/fom0elpg5e00qmdt0ttn.jpg' ,
        imgb: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458192/dqjwe84uqj5bsksi7mf2.jpg' ,
        name: 'Cà chua',
        giacu:2.79,
        gia:1.00,
        quantity: 1,
        propmota:'Cà chua  thuộc họ Cà (Solanaceae), là một loại rau quả làm thực phẩm. Quả ban đầu có màu xanh, chín ngả màu từ vàng đến đỏ. Cà chua có vị hơi chua và là một loại thực phẩm bổ dưỡng, tốt cho cơ thể, giàu vitamin C và A, đặc biệt là giàu lycopene tốt cho sức khỏe.'
    },
    {
        id: 3,
        img: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458180/dlk5eb50bwyy5dnofo4r.jpg',
        category: "Bulbs",
        imga:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458182/hms0tsl4gesrdsqat8iq.jpg' ,
        imgb: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458182/wgmpchsgho1l29jfykpp.jpg' ,
        name: 'Cây Trầu Bà Kim Cương',
        giacu:5.79,
        gia:3.00,
        quantity: 1,
        propmota:'Trầu bà kim cương là cây thân thảo, chiều cao trung bình khoảng 20-40cm. Thân ngắn, dễ mọc thêm rễ phụ xung quanh và thường không phân nhánh. Lá cây lớn, hình mác lớn nhọn ở đỉnh, ở gốc thì hình như trái tim, mặt lá là những đường sọc màu trắng ngà vàng nổi bật.'
    },
    {
        id: 4,
        img: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458185/ntiqocl75wo35qrxd1o0.jpg',
        category: "Fruits",
        imga:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458187/jjute530wb1kz9izltfi.jpg' ,
        imgb:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458186/jr3qadiccmojprnkqivt.jpg',
        name: 'Đậu Phộng',
        giacu:2.79,
        gia:1.00,
        quantity: 1,
        propmota:'Đậu phộng là một loại cây thân thảo hàng năm cao từ 30 đến 50 cm. Cây đậu phộng có thể mọc thẳng hoặc nằm ngang với rễ cọc phát triển tốt và nhiều rễ bên và nốt sần.'
    },
    {
        id: 5,
        img: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458191/p6hsph7opfwydz27t6od.jpg',
        category: "Bulbs",
        imga: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458183/xgfuzokcgysbkry6fbrp.jpg' ,
        imgb:'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458183/xgfuzokcgysbkry6fbrp.jpg' ,
        name: 'Cây Cảnh',
        giacu:5.79,
        gia:3.00,
        quantity: 1,
        propmota:' lá phức lông chim ghép đó chính là mỗi chiếc lá dài khoảng 30-50 cm. Thể rồi trên chiếc lá đó lại có từ 20 đến 40 các cặp lá chét sơ cấp hay còn được gợi là lá chét lông chim lớn.'
    },
    {
        id: 6,
        img:'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458187/ioablkkslbrewlcape35.jpg',
        category: "Fruits",
        imga: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458187/jjute530wb1kz9izltfi.jpg' ,
        imgb:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458186/jr3qadiccmojprnkqivt.jpg' ,
        name: 'Mè Đen',
        giacu:3.79,
        gia:1.00,
        quantity: 1,
        propmota:'Hạt Mè Đen hay vừng đen, loại thực phẩm bổ dưỡng phổ biến trong căn bếp Việt. Hạt béo, bùi, có hậu ngọt, hơi nhẫn đắng từ lớp vỏ bao quanh.'
    },
    {
        id: 7,
        img: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458178/w5o64vuajcyi4cifvup3.jpg',
        category: "Podded",
        imga: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458182/hms0tsl4gesrdsqat8iq.jpg' ,
        imgb:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458182/wgmpchsgho1l29jfykpp.jpg',
        name: 'Cây Kim Tiền',
        giacu:5.79,
        gia:3.00,
        quantity: 1,
        propmota:'Cây kim tiền có tên khoa học là Zamioculcas zamifolia, hay người ta còn gọi là cây kim phát tài, thuộc cây cảnh họ thiên nam tinh, là loại cây dễ chùm, sống lâu năm, xanh tốt'
    },
    {
        id: 8,
        img: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458188/n1lz0cascx2zdtv1uue6.jpg',
        category: "Root",
        imga: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458187/jjute530wb1kz9izltfi.jpg' ,
        imgb:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458187/k3mqmkzos9qgikjmuxid.jpg' ,
        name: 'Đậu Xanh',
        giacu:3.79,
        gia:1.00,
        quantity: 1,
        propmota:'Cây đậu xanh là loại cây thân thảo, mọc đứng, chiều cao khoảng 50 cm. Lá có lông ở cả 2 mặt. '
    },
    {
        id: 9,
        img: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458178/hx4je09tth2i4x19qhro.jpg',
        category: "Root",
        imga:   'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458182/hms0tsl4gesrdsqat8iq.jpg' ,
        imgb:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458182/wgmpchsgho1l29jfykpp.jpg',
        name: 'Cây Vạn Lộc Đỏ',
        giacu:5.79,
        gia:3.00,
        quantity: 1,
        propmota:'Là loại cây thân cỏ có màu xanh nhạt, lá cây màu đỏ chấm xanh, dày sáng bóng, dáng cây đứng thắng, tán lá phủ tròn.'
    },
    {
        id: 10,
        img: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458187/ghdlbslptdd95uedrpq0.jpg',
        category: "Podded",
        imga:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458187/zut5hjmnfltveafgin17.jpg' ,
        imgb: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458192/dqjwe84uqj5bsksi7mf2.jpg' ,
        name: 'Hành',
        giacu:3.79,
        gia:1.00,
        quantity: 1,
        propmota:'Củ hành có hình dạng tròn đều (hình cầu) hoặc tròn hơi dẹp hình bầu dục hoặc hình bầu dục dài, thường có màu vàng hay màu tím hoặc màu trắng.'
    },
    {
        id: 11,
        img:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458182/hms0tsl4gesrdsqat8iq.jpg',
        category: "Root",
        imga: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458182/wgmpchsgho1l29jfykpp.jpg' ,
        imgb:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458189/gfhpg5spp5gbjfp9grlt.jpg' ,
        name: 'Cây Cảnh Mini',
        giacu:5.79,
        gia:3.00,
        quantity: 1,
        propmota:' chúng ta có thể thay đổi chính khônggian làm việc của mình để tạo ra được những cảm giác thoải mái nhất, để tậnhưởng cảm giác vui vẻ, thoải mái nhất ngay cả trong lúc làm việc'
    },
    {
        id: 12,
        img: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458178/nr5a7yd1ugprdtya2bce.jpg',
        category: "Podded",
        imga:  'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458182/wgmpchsgho1l29jfykpp.jpg' ,
        imgb: 'https://res.cloudinary.com/dwouhnbch/image/upload/v1739458182/hms0tsl4gesrdsqat8iq.jpg',
        name: 'Cây Bàng Sing',
        giacu:5.79,
        gia:3.00,
        quantity: 1,
        mota:'Lá bàng có màu xanh, phiến lá rộng và dài, gân lá nổi rõ ở mặt sau. Những chiếc lá bàng non còn được bao phủ bởi một lớp lông tơ mềm mại.'
    },
]

export default { Myac, Gallerryanh };