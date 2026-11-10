import { Product, WorkshopSession, DiyOptions } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'pia-kim-sa-hoang-kim',
    name: 'Pía Kim Sa Hoàng Kim',
    category: 'banh-pia-don',
    categoryLabel: 'Bánh Pía Đơn',
    price: 78000,
    originalPrice: 90000,
    badge: 'Best Seller • Cháy hàng',
    tagline: 'Lớp vỏ ngàn lớp giòn xốp ôm trọn dòng dung nham kim sa béo ngậy ngọt thanh.',
    description: 'Tuyệt tác đại diện cho triết lý Pía Lab. Sự kết hợp giữa kỹ nghệ cán bột thủ công tạo nên 18 lớp vỏ siêu mỏng và công thức kem trứng kim sa ủ ấm ở nhiệt độ 68°C giúp nhân luôn sánh mịn, tuôn chảy khi cắn chạm.',
    origin: 'Xưởng bánh thủ công Pía Lab — Sóc Trăng',
    weight: '150g',
    shelfLife: '14 ngày nhiệt độ phòng / 30 ngày ngăn mát',
    sweetness: 3,
    richness: 5,
    flakiness: 5,
    rating: 4.9,
    reviewCount: 382,
    layers: {
      crust: {
        name: 'Vỏ ngàn lớp hoàng kim',
        description: 'Bột mì nguyên cám hữu cơ cán 18 lớp siêu mỏng với bơ ghee thượng hạng',
        color: '#E5A93C',
        texture: 'flaky',
        glowColor: 'rgba(229, 169, 60, 0.4)'
      },
      filling: {
        name: 'Sốt kem trứng Kim Sa',
        description: 'Lòng đỏ trứng muối tươi đánh nhuyễn cùng nước cốt dừa Bến Tre và sữa hạt',
        color: '#F4C430',
        texture: 'lava',
        glowColor: 'rgba(244, 196, 48, 0.6)'
      },
      core: {
        name: 'Lòng đỏ trứng muối ủ rượu mai quế lộ',
        description: 'Trứng vịt đồng chăn thả tự nhiên, ủ muối hột 28 ngày và xông hương hồi quế',
        color: '#FF6F00',
        texture: 'rich',
        glowColor: 'rgba(255, 111, 0, 0.5)'
      },
      stamp: 'Chữ "Phúc" mộc son truyền thống'
    },
    flavorNotes: ['Trứng muối bùi béo', 'Bơ ghee thơm lừng', 'Hậu vị ngọt thanh thảo mộc', 'Vỏ xốp tan trong miệng'],
    pairing: 'Trà Oolong Thiết Quan Âm hoặc Trà Sen Tây Hồ',
    inStock: true,
    featured: true
  },
  {
    id: 'pia-sau-rieng-ri6',
    name: 'Pía Sầu Riêng Ri6 Thượng Hạng',
    category: 'banh-pia-don',
    categoryLabel: 'Bánh Pía Đơn',
    price: 85000,
    originalPrice: 95000,
    badge: 'Di sản 100 năm',
    tagline: 'Cơm sầu riêng Ri6 chín cây xao sên cùng đậu xanh trứ danh Sóc Trăng.',
    description: 'Giữ trọn vẹn hương vị cội nguồn của bánh Pía Vũng Thơm cổ truyền. Từng thớ cơm sầu riêng Ri6 Chợ Lách vàng ươm được bóc tay cẩn thận, xào thủ công ở lửa than liu riu suốt 4 giờ đồng hồ.',
    origin: 'Làng nghề Vũng Thơm — Sóc Trăng',
    weight: '160g',
    shelfLife: '12 ngày nhiệt độ phòng',
    sweetness: 4,
    richness: 5,
    flakiness: 4,
    rating: 5.0,
    reviewCount: 520,
    layers: {
      crust: {
        name: 'Vỏ da lụa thủ công',
        description: 'Lớp vỏ mềm ẩm mịn màng lưu giữ tinh dầu sầu riêng tự nhiên',
        color: '#D4AF37',
        texture: 'soft-flaky'
      },
      filling: {
        name: 'Đậu xanh sên sầu riêng Ri6',
        description: '80% cơm sầu riêng tươi hòa quyện đậu xanh lòng hạt mẩy',
        color: '#E0A926',
        texture: 'velvety'
      },
      core: {
        name: 'Song noãn hoàng kim (2 trứng muối)',
        description: '2 lòng đỏ trứng muối dẻo quánh rực rỡ tượng trưng cho trăng tròn viên mãn',
        color: '#E65100',
        texture: 'dense'
      },
      stamp: 'Triện đỏ Bông Sen Cổ Truyền'
    },
    flavorNotes: ['Sầu riêng nồng đượm', 'Đậu xanh mịn nhuyễn', 'Vị mặn dịu cân bằng', 'Độ béo sâu'],
    pairing: 'Trà Cổ Thụ Tà Xùa hoặc Bạch Trà Shan Tuyết',
    inStock: true,
    featured: true
  },
  {
    id: 'pia-khoai-mon-hat-sen',
    name: 'Pía Khoai Môn Sáp Hạt Sen',
    category: 'banh-pia-don',
    categoryLabel: 'Bánh Pía Đơn',
    price: 75000,
    badge: 'Thuần khiết • Ít ngọt',
    tagline: 'Khoai môn sáp tím bùi dẻo kết hợp hạt sen Tịnh Tâm xứ Huế thanh tao.',
    description: 'Lựa chọn hoàn hảo cho người yêu thích vị ngọt thanh đạm. Khoai môn sáp thổ nhưỡng Cù Lao Dung dẻo quánh, xen lẫn hạt sen tươi ninh nhừ ngậm đường phèn dịu nhẹ.',
    origin: 'Cù Lao Dung & Cố Đô Huế',
    weight: '150g',
    shelfLife: '14 ngày nhiệt độ phòng',
    sweetness: 2,
    richness: 3,
    flakiness: 4,
    rating: 4.8,
    reviewCount: 219,
    layers: {
      crust: {
        name: 'Vỏ khoai sáp phớt tím',
        description: 'Tẩm màu tự nhiên từ chiết xuất khoai môn tím và lá cẩm',
        color: '#9C6F9E',
        texture: 'flaky'
      },
      filling: {
        name: 'Môn sáp nhuyễn & Hạt sen ninh',
        description: 'Khoai môn nghiền mịn xen kẽ hạt sen nguyên hạt bùi bở',
        color: '#7D5A85',
        texture: 'smooth'
      },
      core: {
        name: 'Trứng muối ủ muối hồng Himalaya',
        description: 'Lòng đỏ bùi thơm điểm xuyết vị mặn nhẹ nhàng',
        color: '#FF8F00',
        texture: 'creamy'
      },
      stamp: 'Triện Trăng Non cách điệu'
    },
    flavorNotes: ['Khoai môn bùi dẻo', 'Hạt sen bở thơm', 'Ngọt thanh dịu', 'Thanh lọc vị giác'],
    pairing: 'Trà Lài Ướp Hoa Tươi hoặc Trà Hoa Cúc Mật Ong',
    inStock: true,
    featured: true
  },
  {
    id: 'pia-matcha-than-tre-pistachio',
    name: 'Pía Than Tre Uji Matcha Pistachio',
    category: 'phien-ban-gioi-han',
    categoryLabel: 'Phiên Bản Giới Hạn',
    price: 98000,
    originalPrice: 120000,
    badge: 'Lab Creation • Đột phá',
    tagline: 'Tinh than tre hoạt tính, bột Matcha Uji Nhật Bản và hạt dẻ cười bùi thơm.',
    description: 'Sáng tạo tiên phong từ phòng thí nghiệm Pía Lab. Lớp vỏ đen huyền bí từ than tre Takesumi Nhật Bản mang lại độ giòn khác biệt, tương phản với nhân matcha ngát hương và hạt pistachio giã thô giòn tan.',
    origin: 'Pía Modern Innovation Lab',
    weight: '155g',
    shelfLife: '15 ngày nhiệt độ phòng',
    sweetness: 2,
    richness: 4,
    flakiness: 5,
    rating: 4.9,
    reviewCount: 164,
    layers: {
      crust: {
        name: 'Vỏ than tre Takesumi',
        description: 'Than tre hoạt tính siêu mịn tạo màu đen nhung tuyền huyền bí',
        color: '#2B2B2B',
        texture: 'ultra-crisp'
      },
      filling: {
        name: 'Kem matcha Uji & Pistachio hạt',
        description: 'Bột trà xanh hạng nhất từ Kyoto kết hợp hạt dẻ cười rang mộc',
        color: '#4D6B3C',
        texture: 'nutty-rich'
      },
      core: {
        name: 'Lõi Phô mai Dung Nham Mascarpone',
        description: 'Phô mai tươi kéo sợi nhẹ nhàng thơm phức',
        color: '#FFF1C5',
        texture: 'molten'
      },
      stamp: 'Biểu tượng Logo Pía Lab Neon Gold'
    },
    flavorNotes: ['Đắng nhẹ hậu ngọt sâu của Matcha', 'Vị bùi giòn của Pistachio', 'Béo nhẹ phô mai', 'Vỏ xốp than tre'],
    pairing: 'Matcha Latte hoặc Cà Phê Cold Brew Cam Vàng',
    inStock: true,
    featured: true
  },
  {
    id: 'hop-nguyet-da-ky-duyen',
    name: 'Hộp Quà "Nguyệt Dạ Kỳ Duyên"',
    category: 'hop-qua-trung-thu',
    categoryLabel: 'Hộp Quà Trung Thu',
    price: 680000,
    originalPrice: 790000,
    badge: 'Bộ Sưu Tập Giới Hạn',
    tagline: 'Hộp sơn mài thủ công ánh kim dạ quang kèm 4 tuyệt phẩm bánh Pía và Trà Oolong.',
    description: 'Hộp quà cao cấp mô phỏng bầu trời đêm rằm rực rỡ với họa tiết Thỏ Ngọc dệt ánh trăng mạ vàng thủ công. Bên trong gồm 4 vị bánh biểu tượng nhất của Pía Lab, kèm dao nĩa mạ vàng và ống trà Ô Long thượng phẩm.',
    origin: 'Thiết kế thủ công nghệ nhân Sơn Mài Hạ Thái',
    weight: '1.2kg (Cả hộp và trà)',
    shelfLife: '30 ngày',
    sweetness: 3,
    richness: 5,
    flakiness: 5,
    rating: 5.0,
    reviewCount: 96,
    layers: {
      crust: {
        name: 'Bộ 4 vỏ bánh nghệ thuật',
        description: 'Hoàng Kim, Da Lụa, Than Tre, Khoai Tím',
        color: '#E5A93C',
        texture: 'curated'
      },
      filling: {
        name: '4 Nhân tuyển chọn',
        description: 'Kim Sa, Sầu Riêng Ri6, Than Tre Matcha, Môn Sáp Hạt Sen',
        color: '#C0392B',
        texture: 'multi'
      },
      core: {
        name: 'Trứng muối & Lava tuyển chọn',
        description: 'Tất cả lòng đỏ ủ 28 ngày chuẩn phong vị cung đình',
        color: '#FFA000',
        texture: 'artisan'
      },
      stamp: 'Bộ 4 Triện Phúc - Lộc - Thọ - Khang'
    },
    flavorNotes: ['Trọn vẹn 4 tầng vị giác từ truyền thống đến phá cách đương đại'],
    pairing: 'Ống Trà Oolong Đào Tuyết kèm sẵn trong hộp',
    inStock: true,
    featured: true
  },
  {
    id: 'hop-hoang-kim-bach-hoa',
    name: 'Hộp Quà "Hoàng Kim Bách Hoa"',
    category: 'hop-qua-trung-thu',
    categoryLabel: 'Hộp Quà Trung Thu',
    price: 980000,
    originalPrice: 1150000,
    badge: 'VIP Thượng Hạng',
    tagline: 'Hộp 2 tầng cơ học trượt mở 3D chứa 6 bánh hoàng gia và Bộ ấm trà gốm mộc.',
    description: 'Kiệt tác hộp quà Trung Thu cơ học lấy cảm hứng từ cấu trúc phân tử của phòng Lab kết hợp cửa sổ lọng hoa truyền thống. Tặng kèm bộ chén gốm nung củi độc bản từ làng gốm Bát Tràng.',
    origin: 'Pía Lab x Nghệ nhân Gốm Bát Tràng',
    weight: '1.8kg',
    shelfLife: '30 ngày',
    sweetness: 3,
    richness: 5,
    flakiness: 5,
    rating: 5.0,
    reviewCount: 48,
    layers: {
      crust: {
        name: '6 Vị Bánh Nghệ Thuật Độc Bản',
        description: 'Bộ sưu tập đầy đủ nhất của phòng sáng chế Pía Lab',
        color: '#D4AF37',
        texture: 'grand'
      },
      filling: {
        name: 'Đầy đủ hương vị thảo mộc & nguyên liệu quý',
        description: 'Nhân sâm, Yến sào, Sầu riêng, Trà xanh, Kim Sa, Môn sáp',
        color: '#1F150E',
        texture: 'luxury'
      },
      core: {
        name: 'Trứng muối ủ rượu hoa mộc tê',
        description: 'Hương thơm thanh tao độc nhất vô nhị',
        color: '#E65100',
        texture: 'precious'
      },
      stamp: 'Họa tiết Bách Hoa Khắc Nổi Mạ Vàng 24K'
    },
    flavorNotes: ['Trải nghiệm ẩm thực mùa Trăng đỉnh cao cho giới tinh hoa'],
    pairing: 'Bộ Trà Danh Trà Tứ Quý & Ấm Tử Sa',
    inStock: true,
    featured: true
  }
];

export const WORKSHOPS: WorkshopSession[] = [
  {
    id: 'ws-truyen-thong-ngan-lop',
    title: 'Kỹ Thuật Cán Bột 18 Lớp Bánh Pía Cổ Truyền',
    subtitle: 'Học nghệ nhân lão thành bí quyết tạo nên lớp vỏ giòn xốp như cánh ve không rách nát.',
    date: 'Thứ Bảy, 15/09/2026',
    time: '09:00 - 12:00 (Sáng)',
    duration: '3 Giờ thực hành',
    location: 'Pía Lab Heritage Space — Tầng 2, 88 Nguyễn Huệ, Q.1, TP.HCM',
    address: '88 Nguyễn Huệ, Phường Bến Nghé, Quận 1',
    price: 450000,
    totalSpots: 16,
    bookedSpots: 14,
    leadArtisan: {
      name: 'Nghệ nhân Lâm Văn Bách',
      role: 'Truyền nhân đời thứ 3 bánh Pía Vũng Thơm',
      experience: '38 năm gìn giữ lò nướng củi cội nguồn Sóc Trăng'
    },
    curriculum: [
      'Lựa chọn bột mì nguyên cám và tỷ lệ nhào bột nước - bột dầu chuẩn xác',
      'Kỹ thuật gập bột 3 lần 4 lớp tạo nên kết cấu vi tầng tách biệt',
      'Bí quyết sên nhân đậu xanh sầu riêng trên chảo đồng',
      'Đóng mộc triện son thủ công và nướng lò canh nhiệt'
    ],
    takeaways: [
      'Mang về 4 bánh Pía do chính tay bạn làm trong hộp quà độc bản',
      'Sổ tay bí quyết công thức làm bánh Pía chuẩn vị tại nhà',
      'Chứng chỉ hoàn thành Workshop Pía Lab Masterclass',
      'Thưởng thức tiệc trà Oolong và bánh nóng ngay tại lò'
    ]
  },
  {
    id: 'ws-phan-tu-kim-sa',
    title: 'Phòng Thí Nghiệm Nhân Lava Kim Sa & Than Tre',
    subtitle: 'Khám phá khoa học ẩm thực đằng sau hiệu ứng tuôn chảy hoàn hảo của sốt kim sa.',
    date: 'Chủ Nhật, 16/09/2026',
    time: '14:30 - 17:30 (Chiều)',
    duration: '3 Giờ tương tác lab',
    location: 'Pía Innovation Kitchen — 124 Thảo Điền, TP. Thủ Đức',
    address: '124 Thảo Điền, TP. Thủ Đức, TP.HCM',
    price: 520000,
    totalSpots: 14,
    bookedSpots: 9,
    leadArtisan: {
      name: 'Chef Đặng Minh Khôi',
      role: 'Head of Culinary R&D tại Pía Lab',
      experience: 'Cựu Bếp phó Bánh ngọt Park Hyatt, 12 năm kinh nghiệm Modern Pastry'
    },
    curriculum: [
      'Ứng dụng nhiệt động học để kiểm soát trạng thái chảy dẻo của lòng đỏ trứng muối',
      'Phối trộn tinh than tre hữu cơ và matcha Uji giữ màu tươi sáng tự nhiên',
      'Tạo hình vỏ bánh tối giản hình khối tương lai',
      'Kiểm định kết cấu bánh bằng kính hiển vi lab chuyên dụng'
    ],
    takeaways: [
      'Hộp quà 4 bánh phong cách Modern Lab mang thương hiệu của riêng bạn',
      'Bình sốt kim sa đặc chế 250ml mang về nhà',
      'Kính bảo hộ & tạp dề thêu tên riêng của Pía Lab'
    ]
  }
];

export const DIY_OPTIONS: DiyOptions = {
  crust: {
    id: 'hoang-kim',
    name: 'Vỏ Hoàng Kim Ngàn Lớp (Truyền Thống)',
    color: '#E5A93C',
    wireColor: '#FFA726',
    description: 'Vỏ bánh 18 lớp màu vàng óng ánh truyền thống từ dầu gấc và bơ lạt nguyên chất.',
    price: 35000
  },
  filling: {
    id: 'sau-rieng-ri6',
    name: 'Sầu Riêng Ri6 & Đậu Xanh Bùi',
    color: '#D4AC0D',
    description: 'Cơm sầu riêng tươi nguyên chất sên cùng đậu xanh hạt mẩy Sóc Trăng.',
    sweetness: 'Vừa phải (3/5)',
    price: 30000
  },
  core: {
    id: 'kim-sa-lava',
    name: 'Nhân Kim Sa Dung Nham Tuôn Chảy',
    color: '#FF6F00',
    description: 'Lòng đỏ trứng muối đánh nhuyễn với kem béo, tan chảy quyến rũ khi cắt mở.',
    glow: 'rgba(255, 111, 0, 0.7)',
    price: 25000
  },
  stamp: {
    id: 'phuc',
    text: '福 (PHÚC)',
    meaning: 'Cầu chúc may mắn, phúc lộc ngập tràn và bình an sum vầy mùa Tết Đoàn Viên.',
    price: 10000
  }
};

export const DIY_CATALOG = {
  crusts: [
    { id: 'hoang-kim', name: 'Hoàng Kim Ngàn Lớp', color: '#E5A93C', wireColor: '#FFA726', price: 35000, desc: 'Bột mì nguyên cám ủ bơ ghee vàng óng' },
    { id: 'than-tre', name: 'Than Tre Takesumi', color: '#2B2B2B', wireColor: '#757575', price: 42000, desc: 'Tinh than tre hoạt tính Nhật Bản huyền bí' },
    { id: 'matcha', name: 'Matcha Uji Xanh Mướt', color: '#557A46', wireColor: '#88B04B', price: 40000, desc: 'Trà xanh hữu cơ ngát hương thanh tịnh' },
    { id: 'khoai-mon', name: 'Môn Tím Cù Lao', color: '#885A89', wireColor: '#BA68C8', price: 38000, desc: 'Màu tím dịu từ củ khoai môn và hoa đậu biếc' }
  ],
  fillings: [
    { id: 'sau-rieng-ri6', name: 'Sầu Riêng Ri6 Đậu Xanh', color: '#D4AC0D', price: 30000, sweetness: '3/5', desc: 'Thơm nức mũi từ sầu riêng Chợ Lách' },
    { id: 'khoai-mon-sap', name: 'Khoai Môn Sáp Dẻo', color: '#7D5A85', price: 28000, sweetness: '2/5', desc: 'Dẻo quánh, thanh tao ít ngọt' },
    { id: 'hat-sen-la-dua', name: 'Hạt Sen Lá Dứa Tươi', color: '#3E7B27', price: 28000, sweetness: '2/5', desc: 'Ngọt thơm dịu mát mùa thu' },
    { id: 'socola-hat-phi', name: 'Dark Chocolate Hazelnut', color: '#4A2E1B', price: 35000, sweetness: '3/5', desc: 'Socola Bỉ 70% đắng nhẹ hòa quyện hạt phỉ giòn' }
  ],
  cores: [
    { id: 'kim-sa-lava', name: 'Lava Kim Sa Tan Chảy', color: '#FF6F00', glow: 'rgba(255, 111, 0, 0.7)', price: 25000, desc: 'Chảy tràn kem trứng béo ngậy' },
    { id: 'trung-muoi-don', name: '1 Trứng Muối Ủ Quế Hồi', color: '#E65100', glow: 'rgba(230, 81, 0, 0.6)', price: 20000, desc: 'Lòng đỏ trứng vịt đồng dẻo quánh' },
    { id: 'trung-muoi-doi', name: 'Song Noãn (2 Trứng Muối)', color: '#D84315', glow: 'rgba(216, 67, 21, 0.7)', price: 35000, desc: 'Trọn vẹn 2 trăng tròn mùa đoàn viên' },
    { id: 'pho-mai-keo-soi', name: 'Mozzarella Kéo Sợi', color: '#FFF3B0', glow: 'rgba(255, 243, 176, 0.6)', price: 25000, desc: 'Kéo sợi dẻo dai béo ngậy độc đáo' }
  ],
  stamps: [
    { id: 'phuc', text: '福 (PHÚC)', meaning: 'May mắn bình an trọn vẹn gia đình', price: 10000 },
    { id: 'loc', text: '祿 (LỘC)', meaning: 'Tài lộc hưng thịnh hanh thông công việc', price: 10000 },
    { id: 'tho', text: '壽 (THỌ)', meaning: 'Sức khỏe dồi dào bách niên giai lão', price: 10000 },
    { id: 'pialab', text: '🔬 PÍA LAB', meaning: 'Dấu ấn phòng lab sáng chế ẩm thực độc bản', price: 15000 },
    { id: 'tho-ngoc', text: '🐇 THỎ NGỌC', meaning: 'Biểu tượng thỏ giã thuốc trên cung trăng', price: 15000 }
  ]
};
