# 🥮 PÍA LAB — NGHỆ THUẬT BÁNH PÍA & TRẢI NGHIỆM MÙA TRĂNG 3D
> **Dự án Nhóm 1: Pía Lab** — Chuyển đổi thiết kế Figma thành Website 3D Tương tác thời gian thực đạt tiêu chuẩn Creative Web.

---
Link xem dự án: https://3-d-bo6plem4i-tms-afb9.vercel.app/
## 🌟 TỔNG QUAN DỰ ÁN

**Pía Lab** là trải nghiệm website kết hợp giữa **di sản văn hóa bánh Pía Sóc Trăng hơn 100 năm** (làng nghề Vũng Thơm) và **phòng thí nghiệm ẩm thực đương đại**. 

Dự án hiện thực hóa trọn vẹn bản thiết kế từ Figma sang nền tảng web hiện đại với công nghệ **WebGL / 3D thời gian thực**, mang lại trải nghiệm khám phá vi tầng bánh, tương tác vật lý chuyển động, và phòng sáng chế bánh Pía độc bản 3D.

---

## 🚀 CÁC TÍNH NĂNG VÀ TRANG ĐÃ TRIỂN KHAI

### 1. Trang Chủ (Cinematic 3D Landing)
- **Hero Banner 3D thời gian thực:**
  - Mô hình 3D chiếc bánh Pía hoàng kim tương tác bằng Three.js / React Three Fiber.
  - Phản ứng trực tiếp với con trỏ chuột (mouse parallax, rotation damping, tilt).
  - Nút chuyển nhanh 4 hương vị: Kim Sa Hoàng Kim, Sầu Riêng Ri6, Khoai Môn Sáp, Than Tre Matcha.
  - Chế độ **"Bổ Đôi 3D" (Cutaway view)**: Mở lát cắt trực quan ngắm dòng nhân kem trứng Kim Sa tan chảy ở 37°C.
  - Chế độ **"Tách Lớp 3D" (Exploded view)**: Bung tách 18 vi tầng vỏ mỏng như cánh ve trong không gian ba chiều.
  - Không gian bầu trời đêm mùa Trăng: Trăng Rằm tháng Tám (Harvest Moon) tỏa ánh vàng ngọc bích, lồng đèn Trung Thu truyền thống đung đưa và bụi phấn vàng bồng bềnh.
- **Thanh số liệu di sản:** 18 lớp vỏ cán tay, -40% độ ngọt gắt, 28 ngày ủ trứng muối thảo mộc, 100% tươi mới.
- **Bento Grid 4 Tuyệt phẩm biểu tượng:** Thẻ sản phẩm với chỉ số hương vị (độ ngọt, độ béo, độ giòn), nút xem lát cắt nhanh và thêm giỏ hàng.
- **Teaser phòng sáng chế DIY & Workshop.**

### 2. Di Sản & Phòng Lab (Story & Process)
- **Dòng thời gian tương tác:** 
  - Khởi sinh từ làng Vũng Thơm 1920s (giao thoa văn hóa Kinh - Hoa - Khmer).
  - Vi kỹ thuật 18 lớp bột nước bọc bột dầu gia truyền.
  - Triết lý Pía Lab 2026: Giảm đường, mật hoa dừa nước tự nhiên, nhân nhũ hóa tuôn chảy.
  - Trứng muối thảo mộc ủ 28 ngày từ vịt đồng đầm nước lợ.
- **Quy trình 6 bước chuẩn Lab:** Từ chọn nông sản bản địa, sên nhân lửa nhỏ 4 giờ, cán 18 lớp vỏ 0.2mm, bọc lõi lava, đóng mộc son nướng hai lửa, đến kiểm định độ brix cảm quan.

### 3. Bộ Sưu Tập Bánh Pía & Hộp Quà (Menu & Catalog)
- Phân loại tab: Bánh Pía đơn, Hộp quà Trung Thu (Nguyệt Dạ Kỳ Duyên, Hoàng Kim Bách Hoa), Phiên bản giới hạn.
- Bộ lọc thông minh theo độ ngọt (Ít ngọt thanh đạm / Đậm đà cổ truyền).
- **Modal Lát Cắt 3D Chi Tiết:** Tải mô hình 3D riêng biệt của từng vị bánh cho phép người dùng xoay 360°, bổ đôi bánh, xem thành phần dinh dưỡng, câu chuyện hương vị và loại trà thưởng thức phù hợp.

### 4. Pía Lab DIY — Phòng Thí Nghiệm Sáng Tế Bánh 3D
- **Trải nghiệm độc nhất vô nhị:** Khách hàng tự tay phối chiếc bánh Pía của riêng mình trên bệ thí nghiệm 3D xoay:
  - **4 loại vỏ:** Hoàng Kim ngàn lớp, Than Tre Takesumi, Matcha Uji, Khoai Môn tím.
  - **4 loại nhân:** Sầu Riêng Ri6 Chợ Lách, Khoai Môn sáp dẻo, Hạt Sen lá dứa, Dark Chocolate hạt phỉ.
  - **4 loại lõi:** Lava Kim Sa tan chảy, 1 Trứng muối thảo mộc, Song noãn 2 trứng muối, Phô mai kéo sợi.
  - **5 mộc triện son:** Phúc (福), Lộc (祿), Thọ (壽), Pía Lab (🔬), Thỏ Ngọc (🐇).
- **Tính toán trực tiếp:** Giá tiền nướng tươi, calories (~380 kcal), tạo mã công thức độc bản (ví dụ: `LAB-HOSAKIPHUC`) và đóng gói gửi vào giỏ hàng thật kèm hiệu ứng pháo hoa Confetti!

### 5. Workshop Làm Bánh Cuối Tuần (Events & Booking)
- 2 khóa thực hành: Cán bột 18 lớp cổ truyền (Heritage Space Q1) & Khóa Molecular Lava Kim Sa (Thảo Điền).
- Đếm số chỗ trống thực tế theo thời gian thực.
- Hồ sơ nghệ nhân lão thành 38 năm kinh nghiệm & Bếp trưởng R&D.
- Form đăng ký giữ chỗ trực tuyến, tính học phí tự động, xuất mã vé SMS ngay tức thì.

### 6. Giỏ Hàng & Thanh Toán Mùa Trăng (Cart & Checkout)
- Quản lý giỏ hàng: Cập nhật số lượng, xóa món, hiển thị chi tiết các tầng bánh tự phối DIY.
- Nhập mã ưu đãi mùa Trăng: `PIALAB10` (giảm 10%), `TRUNGTHU2026` (giảm 10%), `VIPLAB` (giảm 15%).
- Form giao bánh: Họ tên, số điện thoại, địa chỉ, chọn ngày nhận bánh tươi trong dịp Trung Thu.
- Ghi chú lời chúc thiệp mùa Trăng miễn phí.
- 3 phương thức thanh toán: Quét mã VietQR 24/7, Thẻ tín dụng quốc tế, Thanh toán khi nhận hàng (COD).
- Xác nhận đơn hàng thành công kèm mã theo dõi đơn `PIA-XXXXXX`.

### 7. Trợ Lý Mascot "Bé Pía" Thông Minh
- Nhân vật Mascot "Bé Pía" được dựng hoạt họa SVG với kính tròn nhà khoa học, nón đầu bếp và mộc son trán may mắn.
- Tự động thay đổi lời khuyên và hướng dẫn theo từng trang mà người dùng đang truy cập.
- Có thể thu nhỏ / mở rộng và hỗ trợ điều hướng nhanh.

---

## 🛠 TECH STACK KỸ THUẬT

- **Framework:** React 18, TypeScript, Vite 5.
- **3D Graphics & WebGL:**
  - Three.js (`^0.169.0`)
  - `@react-three/fiber` (`^8.17.10`)
  - `@react-three/drei` (`^9.117.3`)
- **Animation & Physics:**
  - `framer-motion` (`^11.11.17`)
  - `gsap` (`^3.12.5`)
  - `canvas-confetti` (`^1.9.3`)
- **Styling & UI:**
  - Tailwind CSS (`^3.4.14`)
  - Custom Gold & Charcoal Glassmorphism
  - `lucide-react` (Hệ thống biểu tượng trực quan)
- **Tối ưu hiệu năng 60 FPS:**
  - Adaptive DPR (`dpr={[1, 2]}`) giúp mượt mà trên cả thiết bị di động.
  - WebGLErrorBoundary tự động chuyển fallback nếu thiết bị không hỗ trợ tăng tốc phần cứng.
  - Không tạo render loop riêng lẻ, quản lý đồng bộ qua requestAnimationFrame của R3F.

---

## 💻 HƯỚNG DẪN KHỞI CHẠY DỰ ÁN

### 1. Cài đặt Dependencies (nếu chưa cài):
```bash
npm install
```

### 2. Chạy môi trường Development:
```bash
npm run dev
```
Trình duyệt sẽ mở tại: `http://localhost:5173/`

### 3. Build Production & Kiểm thử:
```bash
npm run build
npm run preview
```
Production build sẽ được tạo trong thư mục `dist/` và chạy tại: `http://localhost:4173/`

---

## 🎨 BẢNG ĐỐI CHIẾU FIGMA FRAME → REACT COMPONENT

| Figma Frame / Section | React Route / Component | Mô tả chức năng |
|---|---|---|
| **Hero Frame (Dark & Gold)** | `src/pages/HomePage.tsx` | Banner 3D tương tác bánh Pía thời gian thực, đèn lồng, trăng rằm, chọn vị |
| **Pía Mascot & Dialogs** | `src/components/ui/MascotAssistant.tsx` | Bé Pía trợ lý tương tác, bóng thoại thông minh theo từng trang |
| **Di Sản & Lịch Sử (1920 - 2026)** | `src/pages/StoryPage.tsx` | Lịch sử làng Vũng Thơm, vi kỹ thuật 18 lớp vỏ, 6 bước chuẩn lab |
| **Catalog & Product Details** | `src/pages/ProductsPage.tsx` | Danh mục bánh đơn, hộp quà, bộ lọc độ ngọt, modal lát cắt 3D |
| **Sáng Chế Bánh / DIY Studio** | `src/pages/DiyLabPage.tsx` | Bàn thí nghiệm 3D phối vỏ - nhân - lõi - triện, tính giá tức thì |
| **Workshop & Lớp Học Làm Bánh** | `src/pages/WorkshopPage.tsx` | Đăng ký lớp học nghệ nhân, lịch học, thông tin giảng viên |
| **Cart & Thanh Toán Đơn Hàng** | `src/pages/CartCheckoutPage.tsx` | Giỏ hàng, mã giảm giá, form giao bánh, thanh toán VietQR |

---

*PÍA LAB — Heritage Meets Innovation • Nhóm 1 Triển Khai.*
