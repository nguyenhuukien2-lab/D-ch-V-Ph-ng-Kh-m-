export const INITIAL_SERVICES = [
  {
    id: 'srv-1',
    name: 'Khám Nội Tổng Quát & Tầm Soát Sức Khỏe',
    category: 'Nội khoa',
    categorySlug: 'noi-khoa',
    price: 350000,
    oldPrice: 500000,
    duration: '30 phút',
    description: 'Chẩn đoán và điều trị các bệnh lý nội khoa phổ biến, đo điện tim, tư vấn chỉ số sinh hiệu và phác đồ điều trị toàn diện.',
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=800&q=80',
    popular: true,
    steps: [
      'Đo sinh hiệu (Huyết áp, Mạch, SpO2, Chỉ số BMI)',
      'Hỏi tiền sử bệnh & Khám lâm sàng toàn thân',
      'Đo điện tâm đồ (ECG) kiểm tra sức khỏe tim mạch',
      'Tư vấn chế độ dinh dưỡng, lối sống & kê đơn thuốc'
    ]
  },
  {
    id: 'srv-2',
    name: 'Khám & Tư Vấn Nhi Khoa Toàn Diện',
    category: 'Nội nhi',
    categorySlug: 'nhi-khoa',
    price: 300000,
    duration: '25 phút',
    description: 'Khám dinh dưỡng, theo dõi tăng trưởng, điều trị bệnh đường hô hấp, tiêu hóa và tư vấn lịch tiêm chủng cho trẻ từ 0 - 15 tuổi.',
    icon: 'Baby',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    popular: true,
    steps: [
      'Đánh giá chỉ số phát triển chiều cao, cân nặng, vòng đầu',
      'Khám tai - mũi - họng, tim phổi và hệ tiêu hóa trẻ',
      'Kiểm tra tình trạng vi chất & tư vấn thực đơn dinh dưỡng',
      'Tư vấn phác đồ tiêm chủng chuẩn Y tế'
    ]
  },
  {
    id: 'srv-3',
    name: 'Khám Sản Phụ Khoa & Siêu Âm Thai 4D',
    category: 'Sản phụ khoa',
    categorySlug: 'san-phu-khoa',
    price: 450000,
    oldPrice: 600000,
    duration: '40 phút',
    description: 'Theo dõi thai kỳ định kỳ, siêu âm hình thái thai nhi 4D HD-live, tầm soát ung thư cổ tử cung và điều trị phụ khoa.',
    icon: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    popular: true,
    steps: [
      'Tư vấn tiền thai kỳ & thăm khám phụ khoa chuyên sâu',
      'Siêu âm thai 4D dựng hình HD sắc nét',
      'Xét nghiệm Pap smear / HPV tầm soát ung thư',
      'Tư vấn dinh dưỡng thai kỳ & chăm sóc sức khỏe mẹ bầu'
    ]
  },
  {
    id: 'srv-4',
    name: 'Khám & Tẩy Trắng Răng Công Nghệ Laser',
    category: 'Nha khoa',
    categorySlug: 'nha-khoa',
    price: 1200000,
    oldPrice: 1800000,
    duration: '60 phút',
    description: 'Cạo vôi răng bằng sóng siêu âm, tẩy trắng răng laser không tê buốt, thẩm mỹ nụ cười an toàn chuẩn y khoa.',
    icon: 'Smile',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    popular: false,
    steps: [
      'Thăm khám tổng quát sức khỏe răng miệng & chụp X-quang',
      'Cạo vôi răng siêu âm & đánh bóng làm sạch bề mặt',
      'Thoa gel bảo vệ nướu & chiếu đèn Laser làm trắng',
      'Hướng dẫn vệ sinh răng miệng & tặng kem chống ê buốt'
    ]
  },
  {
    id: 'srv-5',
    name: 'Khám & Điều Trị Da Liễu / Chăm Sóc Da Y Khoa',
    category: 'Da liễu',
    categorySlug: 'da-lieu',
    price: 400000,
    duration: '35 phút',
    description: 'Soi da cắt lớp kỹ thuật số, điều trị mụn chuẩn y khoa, tàn nhang, viêm da cơ địa và phục hồi màng bảo vệ da.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80',
    popular: true,
    steps: [
      'Soi da với công nghệ Visia chẩn đoán sắc tố & lỗ chân lông',
      'Bác sĩ da liễu khám trực tiếp & lên phác đồ điều trị',
      'Làm sạch sâu y khoa & chiếu ánh sáng sinh học Bio-Light',
      'Kê đơn sản phẩm dược mỹ phẩm phù hợp với làn da'
    ]
  },
  {
    id: 'srv-6',
    name: 'Gói Xét Nghiệm Máu & Sinh Hóa Tổng Quát',
    category: 'Xét nghiệm',
    categorySlug: 'xet-nghiem',
    price: 650000,
    oldPrice: 850000,
    duration: '20 phút',
    description: 'Đánh giá 18 chỉ số quan trọng: đường huyết, mỡ máu, chức năng gan, thận, công thức máu và chỉ số gút.',
    icon: 'TestTube',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    popular: true,
    steps: [
      'Lấy máu xét nghiệm nhẹ nhàng không đau bởi điều dưỡng lành nghề',
      'Phân tích tự động trên hệ thống máy Cobas Roche Đức',
      'Trả kết quả nhanh chóng trong 60 phút qua App / Zalo / Email',
      'Bác sĩ chuyên khoa đọc kết quả & tư vấn trực tiếp'
    ]
  },
  {
    id: 'srv-7',
    name: 'Gói Tầm Soát Ung Thư Toàn Diện Nam / Nữ',
    category: 'Tầm soát ung thư',
    categorySlug: 'tam-soat-ung-thu',
    price: 2500000,
    oldPrice: 3200000,
    duration: '90 phút',
    description: 'Xét nghiệm Marker ung thư (Phổi, Gan, Tiêu hóa, Vú, Cổ tử cung/Tiền liệt tuyến), siêu âm ổ bụng tổng quát và chụp X-quang ngực.',
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    popular: false,
    steps: [
      'Lấy mẫu máu xét nghiệm các chỉ số dấu ấn ung thư tầm soát',
      'Siêu âm màu 4D ổ bụng toàn diện & Tuyến giáp',
      'Chụp X-quang tim phổi kỹ thuật số liều thấp',
      'Hội chẩn bác sĩ chuyên khoa Ung bướu & trả sổ khám chi tiết'
    ]
  },
  {
    id: 'srv-8',
    name: 'Khám & Đo Điện Tâm Đồ Tim Mạch Chuyên Sâu',
    category: 'Tim mạch',
    categorySlug: 'tim-mach',
    price: 500000,
    duration: '40 phút',
    description: 'Khám sàng lọc cao huyết áp, thiếu máu cơ tim, rối loạn nhịp tim, siêu âm Doppler tim & tư vấn dự phòng đột quỵ.',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80',
    popular: false,
    steps: [
      'Đo huyết áp liên tục & ghi điện tâm đồ 12 chuyển đạo',
      'Siêu âm tim Doppler màu khảo sát chức năng co bóp tim',
      'Đánh giá nguy cơ xơ vữa động mạch & đột quỵ',
      'Kê đơn thuốc chuẩn ESC & tư vấn bài tập thể thao an toàn'
    ]
  }
];

export const INITIAL_DOCTORS = [
  {
    id: 'doc-1',
    name: 'PGS.TS.BS Nguyễn Văn An',
    degree: 'Phó Giáo Sư - Tiến Sĩ - Bác Sĩ',
    specialty: 'Nội khoa & Tim Mạch',
    specialtySlug: 'noi-khoa',
    experience: '25+ năm kinh nghiệm',
    experienceYears: 25,
    hospital: 'Nguyên Trưởng khoa Nội - Bệnh viện Chợ Rẫy',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    bio: 'Chuyên gia hàng đầu về chẩn đoán và điều trị bệnh lý nội khoa, tăng huyết áp, bệnh mạch vành và dự phòng đột quỵ. Hơn 25 năm cống hiến tại các bệnh viện tuyến đầu Việt Nam.',
    scheduleDays: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'],
    timeSlots: ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '14:00 - 15:00', '15:00 - 16:00'],
    rating: 4.9,
    reviewCount: 312,
    certificates: [
      'Chứng chỉ Chuyên khoa Tim mạch Quốc tế (ACC - Mỹ)',
      'Bằng Tiến sĩ Y Khoa - Đại học Y Dược TP.HCM',
      'Bằng Khen của Bộ Y Tế vì cống hiến y học'
    ]
  },
  {
    id: 'doc-2',
    name: 'ThS.BS Trần Thị Mai Hương',
    degree: 'Thạc Sĩ - Bác Sĩ Chuyên Khoa I',
    specialty: 'Sản Phụ Khoa',
    specialtySlug: 'san-phu-khoa',
    experience: '16+ năm kinh nghiệm',
    experienceYears: 16,
    hospital: 'Bệnh viện Từ Dũ',
    avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&w=800&q=80',
    bio: 'Bác sĩ Mai Hương chuyên theo dõi thai kỳ nguy cơ cao, siêu âm hình thái 4D, tư vấn vô sinh hiếm muộn và phẫu thuật thẩm mỹ tầng sinh môn.',
    scheduleDays: ['Thứ 2', 'Thứ 4', 'Thứ 6', 'Thứ 7'],
    timeSlots: ['08:30 - 09:30', '09:30 - 10:30', '13:30 - 14:30', '15:00 - 16:00', '16:30 - 17:30'],
    rating: 5.0,
    reviewCount: 245,
    certificates: [
      'Chứng chỉ Siêu âm Thai Chuyên sâu - ISUOG',
      'Thạc sĩ Sản Phụ Khoa - Đại học Y Hà Nội',
      'Tu nghiệp Y học Sinh sản tại Singapore'
    ]
  },
  {
    id: 'doc-3',
    name: 'BS.CKII Lê Hoàng Nam',
    degree: 'Bác Sĩ Chuyên Khoa II',
    specialty: 'Nhi Khoa',
    specialtySlug: 'nhi-khoa',
    experience: '18+ năm kinh nghiệm',
    experienceYears: 18,
    hospital: 'Bệnh viện Nhi Đồng 1',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    bio: 'Được nhiều phụ huynh yêu mến bởi sự ân cần, thấu hiểu tâm lý trẻ nhỏ và hạn chế dùng kháng sinh không cần thiết trong điều trị hô hấp & tiêu hóa ở trẻ.',
    scheduleDays: ['Thứ 2', 'Thứ 3', 'Thứ 5', 'Thứ 7', 'Chủ nhật'],
    timeSlots: ['08:00 - 09:00', '09:30 - 10:30', '14:00 - 15:00', '16:00 - 17:00'],
    rating: 4.95,
    reviewCount: 420,
    certificates: [
      'Bác sĩ Chuyên khoa II Nhi Khoa',
      'Chứng chỉ Dinh dưỡng Nhi lâm sàng - Viện Dinh Dưỡng Quốc Gia',
      'Thành viên Hội Nhi Khoa Việt Nam'
    ]
  },
  {
    id: 'doc-4',
    name: 'ThS.BS Phạm Minh Tuấn',
    degree: 'Thạc Sĩ - Bác Sĩ',
    specialty: 'Nha Khoa Thẩm Mỹ',
    specialtySlug: 'nha-khoa',
    experience: '12+ năm kinh nghiệm',
    experienceYears: 12,
    hospital: 'Bệnh viện Răng Hàm Mặt Trung Ương',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
    bio: 'Chuyên gia phục hình nha khoa thẩm mỹ, cấy ghép Implant và niềng răng trong suốt Invisalign. Mang lại nụ cười tự tin rạng rỡ cho hàng nghìn khách hàng.',
    scheduleDays: ['Thứ 3', 'Thứ 4', 'Thứ 6', 'Thứ 7'],
    timeSlots: ['09:00 - 10:00', '10:30 - 11:30', '14:30 - 15:30', '16:00 - 17:00'],
    rating: 4.88,
    reviewCount: 189,
    certificates: [
      'Chứng chỉ Cấy ghép Implant Quốc tế (ICOI)',
      'Chứng chỉ Chỉnh nha Invisalign Platinum provider',
      'Thạc sĩ Răng Hàm Mặt'
    ]
  },
  {
    id: 'doc-5',
    name: 'BS.CKI Nguyễn Thị Ngọc Ánh',
    degree: 'Bác Sĩ Chuyên Khoa I',
    specialty: 'Da Liễu & Thẩm Mỹ Da',
    specialtySlug: 'da-lieu',
    experience: '14+ năm kinh nghiệm',
    experienceYears: 14,
    hospital: 'Bệnh viện Da Liễu TP.HCM',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Nổi tiếng trong điều trị mụn chuẩn y khoa, mụn trứng cá bọc, sẹo rỗ, trẻ hóa da Laser Pico và điều trị nám tàn nhang hiệu quả cao.',
    scheduleDays: ['Thứ 2', 'Thứ 4', 'Thứ 5', 'Thứ 7', 'Chủ nhật'],
    timeSlots: ['08:30 - 09:30', '10:00 - 11:00', '13:30 - 14:30', '15:30 - 16:30'],
    rating: 4.92,
    reviewCount: 310,
    certificates: [
      'Chứng chỉ Ứng dụng Laser & Năng lượng trong Da liễu',
      'Bác sĩ Chuyên khoa I Da Liễu',
      'Hội viên Hội Da Liễu Thẩm Mỹ Việt Nam'
    ]
  },
  {
    id: 'doc-6',
    name: 'TS.BS Vũ Hoàng Anh',
    degree: 'Tiến Sĩ - Bác Sĩ Chuyên Khoa Xét Nghiệm',
    specialty: 'Xét Nghiệm & Tầm Soát Ung Thư',
    specialtySlug: 'xet-nghiem',
    experience: '20+ năm kinh nghiệm',
    experienceYears: 20,
    hospital: 'Viện Pasteur TP.HCM',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
    bio: 'Phụ trách trung tâm xét nghiệm tự động MedCare. Đảm bảo 100% kết quả xét nghiệm đạt chuẩn nội kiểm & ngoại kiểm ISO 15189.',
    scheduleDays: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6'],
    timeSlots: ['07:30 - 08:30', '09:00 - 10:00', '10:30 - 11:30', '14:00 - 15:00'],
    rating: 4.9,
    reviewCount: 165,
    certificates: [
      'Tiến sĩ Sinh học Phân tử & Y sinh',
      'Chứng chỉ Quản lý Chất lượng Phòng Xét Nghiệm ISO 15189',
      'Thành viên Hội Y học Dự phòng Việt Nam'
    ]
  }
];

export const INITIAL_ARTICLES = [
  {
    id: 'art-1',
    slug: '5-dau-hieu-can-tam-soat-tim-mach-ngay',
    title: '5 Dấu Hiệu Cảnh Báo Bạn Cần Tầm Soát Tim Mạch Càng Sớm Càng Tốt',
    excerpt: 'Tăng huyết áp, tức ngực thoảng qua hay hụt hơi khi leo cầu thang có thể là triệu chứng sớm của bệnh lý mạch vành nguy hiểm.',
    category: 'Tim mạch',
    author: 'PGS.TS.BS Nguyễn Văn An',
    publishedAt: '22/07/2026',
    readTime: '5 phút đọc',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    content: `
      <h3>Tại sao tầm soát tim mạch lại quan trọng?</h3>
      <p>Bệnh lý tim mạch được mệnh danh là "kẻ sát nhân thầm lặng" vì nhiều trường hợp tiến triển âm thầm không có triệu chứng rõ ràng cho đến khi xảy ra biến cố đột quỵ hoặc nhồi máu cơ tim.</p>
      
      <h3>5 Dấu hiệu warning không nên bỏ qua:</h3>
      <ul>
        <li><strong>Đau tức hoặc nặng ngực:</strong> Cảm giác như có vật nặng đè lên lồng ngực, lan ra vai trái hoặc cằm.</li>
        <li><strong>Khó thở khi gắng sức nhẹ:</strong> Hụt hơi khi đi bộ quãng ngắn hoặc leo 1-2 tầng cầu thang.</li>
        <li><strong>Hoa mắt, chóng mặt thường xuyên:</strong> Do lưu lượng máu cung cấp lên não không ổn định.</li>
        <li><strong>Nhịp tim đập nhanh hoặc bỏ nhịp:</strong> Hồi hộp đánh trống ngực bất ngờ.</li>
        <li><strong>Sưng phù chân & cổ chân:</strong> Dấu hiệu của sự ứ trệ tuần hoàn máu.</li>
      </ul>

      <p>Nếu bạn hoặc người thân có 2/5 dấu hiệu trên, hãy chủ động đặt lịch khám tim mạch để được đo điện tâm đồ và siêu âm tim Doppler sớm nhất.</p>
    `
  },
  {
    id: 'art-2',
    slug: 'huong-dan-cham-soc-sot-o-tre-nhi-tai-nha',
    title: 'Hướng Dẫn Hạ Sốt An Toàn Cho Trẻ Nhỏ Tại Nhà Chuẩn Y Khoa',
    excerpt: 'Bác sĩ Nhi khoa chia sẻ cách lau mát đúng cách, liều lượng Paracetamol chuẩn theo cân nặng và thời điểm cần đưa trẻ đến bệnh viện.',
    category: 'Nhi khoa',
    author: 'BS.CKII Lê Hoàng Nam',
    publishedAt: '20/07/2026',
    readTime: '6 phút đọc',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    content: `
      <h3>Nguyên tắc xử trí khi trẻ sốt</h3>
      <p>Sốt là phản ứng tự nhiên của hệ miễn dịch chống lại vi khuẩn, vi-rút. Phụ huynh cần giữ bình tĩnh và thực hiện các bước sau:</p>
      
      <ol>
        <li>Nơi thoáng mát, mặc quần áo mỏng nhẹ cotton thấm hút mồ hôi.</li>
        <li>Cho trẻ uống đủ nước (nước lọc, oresol, sữa, nước trái cây).</li>
        <li>Lau mát bằng nước ấm (thấp hơn nhiệt độ cơ thể trẻ 2 độ C) tại các vùng bẹn, nách, cổ.</li>
        <li>Cho dùng thuốc hạ sốt Paracetamol đúng liều 10-15mg/kg cân nặng mỗi 4-6 giờ nếu trẻ sốt > 38.5°C.</li>
      </ol>

      <p><strong>Cảnh báo cấp cứu:</strong> Đưa trẻ đi khám ngay nếu trẻ co giật, lơ mơ, sốt cao > 39.5°C không hạ, hoặc bỏ bú hoàn toàn.</p>
    `
  },
  {
    id: 'art-3',
    slug: 'lich-sieu-am-thai-dinh-ky-quan-trong',
    title: 'Các Mốc Siêu Âm Thai Kỳ Quan Trọng Mẹ Bầu Cần Ghi Nhớ',
    excerpt: '4 cột mốc vàng siêu âm hình thái 4D giúp phát hiện sớm các dị tật bẩm sinh và đánh giá sự phát triển chuẩn của thai nhi.',
    category: 'Sản phụ khoa',
    author: 'ThS.BS Trần Thị Mai Hương',
    publishedAt: '18/07/2026',
    readTime: '7 phút đọc',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    content: `
      <h3>Các mốc siêu âm vàng trong thai kỳ:</h3>
      <ul>
        <li><strong>Tuần 6 - 8:</strong> Xác định thai vào tử cung, đo tim thai và tính tuổi thai chính xác.</li>
        <li><strong>Tuần 11 - 13 tuần 6 ngày:</strong> Siêu âm đo độ mờ da подушка (Nuchal Translucency) kết hợp xét nghiệm Double Test tầm soát hội chứng Down.</li>
        <li><strong>Tuần 18 - 22:</strong> Siêu âm 4D dựng hình kiểm tra toàn bộ cấu trúc hình thái thai nhi (tim, não, cột sống, sứt môi).</li>
        <li><strong>Tuần 30 - 32:</strong> Đánh giá tăng trưởng thai, lượng nước ối và tuần hoàn dây rốn trước sinh.</li>
      </ul>
    `
  },
  {
    id: 'art-4',
    slug: 'quy-trinh-tay-trang-rang-laser-co-dau-khong',
    title: 'Tẩy Trắng Răng Laser Có Ê Buốt Không? Quy Trình An Toàn Tại Phòng Khám',
    excerpt: 'Giải đáp thắc mắc về công nghệ tẩy trắng răng mới bằng ánh sáng Laser lạnh, giúp răng trắng sáng lên 2-4 tông chỉ sau 45 phút.',
    category: 'Nha khoa',
    author: 'ThS.BS Phạm Minh Tuấn',
    publishedAt: '15/07/2026',
    readTime: '4 phút đọc',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Nhiều khách hàng ngần ngại tẩy trắng răng vì sợ đau buốt. Tuy nhiên với công nghệ Laser Whitening thế hệ mới tại MedCare Clinic, gel tẩy trắng được hoạt hóa bằng bước sóng ánh sáng dịu nhẹ, hoàn toàn không xâm hại men răng.</p>
    `
  },
  {
    id: 'art-5',
    slug: 'y-nghia-cac-chi-so-xet-nghiem-mau-tong-quat',
    title: 'Hiểu Đúng Ý Nghĩa Các Chỉ Số Trong Kết Quả Xét Nghiệm Máu',
    excerpt: 'Hướng dẫn đọc nhanh chỉ số đường huyết Glu, mỡ máu Cholesterol, men gan AST/ALT và chỉ số Gout Acid Uric trong bản kết quả.',
    category: 'Xét nghiệm',
    author: 'TS.BS Vũ Hoàng Anh',
    publishedAt: '10/07/2026',
    readTime: '8 phút đọc',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    content: `
      <p>Bản kết quả xét nghiệm máu chứa nhiều thuật ngữ y khoa. Việc nắm rõ khoảng tham chiếu an toàn giúp bạn tự theo dõi sức khỏe và điều chỉnh lối sống kịp thời.</p>
    `
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Chị Nguyễn Thanh Thảo',
    age: 34,
    role: 'Bệnh nhân khám Sản phụ khoa',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '21/07/2026',
    comment: 'Tôi theo dõi thai kỳ tại MedCare với bác sĩ Mai Hương suốt 9 tháng. Bác sĩ siêu âm rất kỹ, tỉ mỉ giải thích từng ngón tay ngón chân của bé. Phòng khám sạch sẽ chuẩn 5 sao, lễ tân siêu chu đáo!',
    doctorName: 'ThS.BS Trần Thị Mai Hương',
    serviceName: 'Khám Sản Phụ Khoa & Siêu Âm Thai 4D'
  },
  {
    id: 'rev-2',
    name: 'Anh Trần Quốc Bảo',
    age: 45,
    role: 'Bệnh nhân khám Tim mạch',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '19/07/2026',
    comment: 'PGS.TS Nguyễn Văn An khám vô cùng tận tâm. Bác tư vấn chi tiết phác đồ kiểm soát huyết áp mà không kê đơn quá tay. Đặt lịch trước trên web đến nơi được vào khám ngay không cần đợi.',
    doctorName: 'PGS.TS.BS Nguyễn Văn An',
    serviceName: 'Khám Nội Tổng Quát & Tầm Soát Sức Khỏe'
  },
  {
    id: 'rev-3',
    name: 'Chị Lê Thị Minh Châu',
    age: 29,
    role: 'Mẹ bé Khang (3 tuổi)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '15/07/2026',
    comment: 'Bé nhà mình sợ đi khám lắm nhưng gặp bác sĩ Nam Nhi khoa thì cười suốt. Phòng chờ có khu vui chơi sạch đẹp cho bé. Dịch vụ quá xuất sắc!',
    doctorName: 'BS.CKII Lê Hoàng Nam',
    serviceName: 'Khám & Tư Vấn Nhi Khoa Toàn Diện'
  },
  {
    id: 'rev-4',
    name: 'Anh Phạm Đăng Khoa',
    age: 38,
    role: 'Bệnh nhân Nha khoa',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '12/07/2026',
    comment: 'Vừa tẩy trắng răng Laser bên phòng khám tuần trước. Răng trắng lên thấy rõ, không êm buốt tý nào. Giá cả minh bạch niêm yết rõ ràng.',
    doctorName: 'ThS.BS Phạm Minh Tuấn',
    serviceName: 'Khám & Tẩy Trắng Răng Công Nghệ Laser'
  },
  {
    id: 'rev-5',
    name: 'Chị Hoàng Ngọc Dung',
    age: 26,
    role: 'Bệnh nhân Da liễu',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    date: '08/07/2026',
    comment: 'Da mình từng mụn viêm rất nặng, được bác sĩ Ngọc Ánh soi da và lên liệu trình y khoa 2 tháng nay da đã sạch mụn bóng khỏe. Cảm ơn bác sĩ nhiều!',
    doctorName: 'BS.CKI Nguyễn Thị Ngọc Ánh',
    serviceName: 'Khám & Điều Trị Da Liễu / Chăm Sóc Da Y Khoa'
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-101',
    code: 'MC-98124',
    patientName: 'Nguyễn Văn Minh',
    phone: '0908123456',
    email: 'minh.nguyen@gmail.com',
    dob: '1988-04-12',
    gender: 'Nam',
    serviceId: 'srv-1',
    serviceName: 'Khám Nội Tổng Quát & Tầm Soát Sức Khỏe',
    doctorId: 'doc-1',
    doctorName: 'PGS.TS.BS Nguyễn Văn An',
    date: '2026-07-25',
    timeSlot: '09:00 - 10:00',
    status: 'Đã xác nhận',
    reason: 'Đau tức ngực nhẹ khi tập thể dục, muốn kiểm tra tim mạch.',
    createdAt: '2026-07-24 08:30',
    price: 350000
  },
  {
    id: 'apt-102',
    code: 'MC-98125',
    patientName: 'Trần Thị Thu Hà',
    phone: '0912987654',
    email: 'thuha.tran@gmail.com',
    dob: '1995-11-20',
    gender: 'Nữ',
    serviceId: 'srv-3',
    serviceName: 'Khám Sản Phụ Khoa & Siêu Âm Thai 4D',
    doctorId: 'doc-2',
    doctorName: 'ThS.BS Trần Thị Mai Hương',
    date: '2026-07-25',
    timeSlot: '13:30 - 14:30',
    status: 'Chờ xác nhận',
    reason: 'Khám thai định kỳ 22 tuần, siêu âm 4D.',
    createdAt: '2026-07-24 09:15',
    price: 450000
  },
  {
    id: 'apt-103',
    code: 'MC-98120',
    patientName: 'Lê Hoàng Hải',
    phone: '0983112233',
    email: 'hai.le@gmail.com',
    dob: '1990-02-15',
    gender: 'Nam',
    serviceId: 'srv-5',
    serviceName: 'Khám & Điều Trị Da Liễu / Chăm Sóc Da Y Khoa',
    doctorId: 'doc-5',
    doctorName: 'BS.CKI Nguyễn Thị Ngọc Ánh',
    date: '2026-07-23',
    timeSlot: '10:00 - 11:00',
    status: 'Đã khám',
    reason: 'Tái khám mụn bọc vùng má.',
    createdAt: '2026-07-22 14:00',
    price: 400000
  }
];

export const CLINIC_INFO = {
  name: 'Phòng Khám Đa Khoa MedCare Clinic',
  tagline: 'Chăm Sóc Sức Khỏe Toàn Diện - Đỉnh Cao Y Khoa',
  hotline: '1900 6868',
  phoneDirect: '028 3920 1234',
  zalo: '0908686868',
  email: 'cskh@medcare.vn',
  address: '123 Đường Nguyễn Văn Cừ, Phường 2, Quận 5, TP. Hồ Chí Minh',
  workingHours: '07:30 - 20:00 (Từ Thứ 2 đến Chủ Nhật)',
  license: 'Giấy phép hoạt động Sở Y Tế TP.HCM số: 08432/SYT-GPHĐ',
  stats: [
    { label: 'Năm Hoạt Động', value: '15+' },
    { label: 'Bác Sĩ Chuyên Khoa', value: '50+' },
    { label: 'Bệnh Nhận Hài Lòng', value: '100k+' },
    { label: 'Đánh Giá Trung Bình', value: '4.9/5' }
  ]
};

export const FAQS = [
  {
    q: 'Tôi có cần đặt lịch khám trước không hay có thể đến trực tiếp?',
    a: 'Bạn nên đặt lịch trước qua website hoặc hotline 1900 6868 để chọn đúng bác sĩ mong muốn và được xếp khung giờ ưu tiên, không phải chờ đợi lâu.'
  },
  {
    q: 'Phòng khám MedCare có thanh toán Bảo hiểm Y tế (BHYT) không?',
    a: 'MedCare có hỗ trợ xuất hóa đơn VAT điện tử chuẩn y tế và giấy tờ đầy đủ để bệnh nhân thanh toán lại với Bảo hiểm Tư nhân (Bảo Việt, Manulife, Prudential, PVI...).'
  },
  {
    q: 'Quy trình đặt lịch online diễn ra thế nào?',
    a: 'Chỉ với 4 bước đơn giản: Chọn Dịch vụ/Chuyên khoa -> Chọn Bác sĩ -> Chọn Ngày & Giờ -> Điền thông tin cá nhân. Bạn sẽ nhận được tin nhắn SMS & Email xác nhận ngay lập tức.'
  },
  {
    q: 'Tôi muốn đổi hoặc hủy lịch hẹn thì làm cách nào?',
    a: 'Bạn có thể vào mục "Tài khoản bệnh nhân" trên website nhập SĐT để quản lý lịch hẹn, hoặc gọi hotline 1900 6868 trước 2 tiếng so với giờ hẹn để hỗ trợ đổi giờ hoàn toàn miễn phí.'
  },
  {
    q: 'Kết quả xét nghiệm và siêu âm có nhận được online không?',
    a: 'Có. Sau khi có kết quả, phòng khám sẽ gửi bản điện tử PDF qua Email/Zalo và hiển thị trực tiếp trong trang Tài khoản bệnh nhân của bạn.'
  }
];
