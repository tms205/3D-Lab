export interface StoryChapter {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  content: string;
  quote?: string;
  stats?: { value: string; label: string };
  imageAlt: string;
}

export const BRAND_STORY: StoryChapter[] = [
  {
    id: 'origin-vung-thom',
    year: '1920s',
    title: 'Khởi Sinh Từ Vũng Thơm Sóc Trăng',
    subtitle: 'Nơi ngã ba sông hòa quyện văn hóa Việt - Hoa - Khmer',
    content: 'Tại vùng đất Vũng Thơm (huyện Mỹ Tú, tỉnh Sóc Trăng xưa), chiếc bánh Pía đầu tiên ra đời mang theo hương thơm của đậu xanh bùi bở và mỡ đường trong veo. "Pía" trong tiếng Triều Châu bắt nguồn từ chữ "Bía" nghĩa là bánh nướng dẹt. Hơn một thế kỷ trôi qua, lò nướng củi Vũng Thơm đã hun đúc nên linh hồn của một đặc sản bất hủ vùng sông nước Cửu Long.',
    quote: '"Chiếc bánh Pía ngon không chỉ nằm ở vị ngọt, mà nằm ở độ khéo léo của người thợ khi tách lớp vỏ mỏng tang mà không để nhân lộ ra."',
    stats: { value: '100+', label: 'Năm di sản làng nghề Vũng Thơm' },
    imageAlt: 'Lò nướng củi cổ truyền Vũng Thơm'
  },
  {
    id: '18-layers-art',
    year: 'Kỹ Thuật',
    title: 'Vi Kỹ Thuật 18 Lớp Vỏ Mỏng Như Khói',
    subtitle: 'Kỹ nghệ cán bột nước bọc bột dầu gia truyền',
    content: 'Điều làm nên sự khác biệt của bánh Pía so với bánh nướng phương Bắc chính là kết cấu vỏ ngàn lớp. Nghệ nhân tại Pía Lab sử dụng tỷ lệ bột mì nguyên cám cao đạm, nhào nặn hai khối bột riêng biệt: "Bột nước" dẻo dai và "Bột dầu" tơi xốp. Qua 3 lần gập và cán mỏng chính xác từng milimet, chiếc bánh hình thành 18 vi tầng xếp chồng. Khi nướng ở nhiệt độ 210°C, các lớp bơ dầu nở bung, tạo độ giòn xốp tan biến ngay đầu lưỡi.',
    stats: { value: '18 Lớp', label: 'Vi tầng bột mỏng bay như cánh ve' },
    imageAlt: 'Quy trình cán bột ngàn lớp thủ công'
  },
  {
    id: 'lab-philosophy',
    year: '2026',
    title: 'Pía Lab — Khi Di Sản Gặp Phòng Thí Nghiệm',
    subtitle: 'Tái định nghĩa bánh Pía bằng khoa học ẩm thực hiện đại',
    content: 'Pía Lab ra đời từ trăn trở: Làm sao để bánh Pía truyền thống không bị bó hẹp trong khuôn mẫu cũ? Chúng tôi thiết lập phòng thí nghiệm ẩm thực đầu tiên chuyên sâu về bánh Pía. Giảm 40% lượng đường công nghiệp tinh luyện, thay thế bằng mật hoa dừa nước tự nhiên giàu khoáng chất có chỉ số đường huyết thấp. Ứng dụng nguyên lý nhũ hóa để tạo nên dòng nhân Kim Sa tan chảy ở 37°C — đúng nhiệt độ vòm họng thực khách.',
    stats: { value: '-40%', label: 'Độ ngọt gắt — Tăng 100% hương thơm nguyên bản' },
    imageAlt: 'Phòng thí nghiệm thực phẩm Pía Lab'
  },
  {
    id: 'egg-yolk-craft',
    year: 'Nguyên Liệu',
    title: 'Lòng Đỏ Trứng Muối Thảo Mộc Ủ 28 Ngày',
    subtitle: 'Trứng vịt chạy đồng đầm mặn muối khoáng tự nhiên',
    content: 'Chúng tôi chỉ chọn trứng vịt thả đồng tự nhiên tại các vùng đầm nước lợ Sóc Trăng và Bến Tre — nơi vịt ăn ốc và tôm tép tự nhiên tạo nên lòng đỏ to tròn, sắc cam đỏ rực rỡ. Trứng được ủ vùi trong tro trấu và muối hột biển Đông đúng 28 ngày. Sau đó, từng lòng đỏ được rửa cẩn thận bằng rượu nếp hoa cúc và xoa dầu mè rang trước khi nướng sơ, đem lại hương thơm ngát không một chút dư vị tanh nồng.',
    stats: { value: '28 Ngày', label: 'Ủ dưỡng thảo mộc truyền thống' },
    imageAlt: 'Trứng muối thảo mộc hoàng kim'
  }
];

export const LAB_STEPS = [
  {
    step: '01',
    title: 'Tuyển Chọn Nông Sản Bản Địa',
    desc: 'Sầu riêng Ri6 chín cây Chợ Lách, đậu xanh lòng hạt mẩy Sóc Trăng, khoai môn sáp Cù Lao Dung.',
    icon: 'Leaf'
  },
  {
    step: '02',
    title: 'Xao Sên Nhân Lửa Nhỏ 4 Giờ',
    desc: 'Nhân được sên đảo liên tục bằng chảo đồng đặc chế ở nhiệt độ chuẩn 85°C để giữ trọn vẹn tinh dầu thơm.',
    icon: 'Flame'
  },
  {
    step: '03',
    title: 'Kỹ Thuật Cán 18 Vi Tầng',
    desc: 'Cán tay thủ công với độ dày từng lớp vỏ chỉ 0.2mm, đảm bảo độ phồng xốp tuyệt đối khi nướng.',
    icon: 'Layers'
  },
  {
    step: '04',
    title: 'Bọc Lõi Lava & Trứng Muối',
    desc: 'Kỹ thuật bao tâm chính xác giúp nhân kim sa nằm trọn vẹn ở tâm bánh, không bị xê dịch hay vỡ rò.',
    icon: 'Sparkles'
  },
  {
    step: '05',
    title: 'Đóng Mộc Son & Nướng Hai Lửa',
    desc: 'Đóng triện son thảo mộc may mắn, nướng 2 lần lửa kết hợp phun sương rượu hoa bưởi tạo màu vàng óng.',
    icon: 'Stamp'
  },
  {
    step: '06',
    title: 'Kiểm Định Hương Vị Chuẩn Lab',
    desc: 'Đo lường độ ẩm brix, độ giòn và kiểm tra cảm quan từng mẻ bánh trước khi đóng gói kín khí giữ trọn vị tươi.',
    icon: 'ShieldCheck'
  }
];
