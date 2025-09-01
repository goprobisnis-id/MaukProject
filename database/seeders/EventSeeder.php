<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan folder storage/app/public/events ada
        if (!Storage::disk('public')->exists('events')) {
            Storage::disk('public')->makeDirectory('events');
        }

        $events = [
            // Status: ongoing (15 data)
            [
                'nama_event' => 'Workshop Digital Marketing 2025',
                'banner' => 'events/workshop-digital-marketing.jpg',
                'tanggal' => '2025-09-15',
                'tempat' => 'Auditorium MAUK, Jakarta',
                'deskripsi' => 'Pelajari strategi digital marketing terkini untuk mengembangkan bisnis Anda. Workshop ini akan membahas SEO, social media marketing, content marketing, dan paid advertising.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Seminar Kewirausahaan Muda',
                'banner' => 'events/seminar-kewirausahaan.jpg',
                'tanggal' => '2025-09-20',
                'tempat' => 'Hotel Grand Indonesia, Jakarta',
                'deskripsi' => 'Seminar inspiratif untuk para pengusaha muda dengan pembicara sukses dari berbagai bidang industri. Dapatkan tips dan trik memulai bisnis dari nol.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Pelatihan E-commerce untuk UMKM',
                'banner' => 'events/pelatihan-ecommerce.jpg',
                'tanggal' => '2025-09-25',
                'tempat' => 'Balai Kota Jakarta',
                'deskripsi' => 'Pelatihan komprehensif untuk UMKM yang ingin go digital. Mulai dari setup toko online, manajemen inventory, hingga strategi pemasaran online.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Conference Teknologi Finansial',
                'banner' => 'events/conference-fintech.jpg',
                'tanggal' => '2025-09-30',
                'tempat' => 'Convention Center Jakarta',
                'deskripsi' => 'Konferensi tahunan membahas perkembangan teknologi finansial di Indonesia. Hadir para ahli fintech, investor, dan regulator.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Workshop Social Media Marketing',
                'banner' => 'events/workshop-sosmed.jpg',
                'tanggal' => '2025-10-05',
                'tempat' => 'Co-working Space Jakarta',
                'deskripsi' => 'Belajar cara memaksimalkan media sosial untuk bisnis. Mulai dari content planning, engagement strategy, hingga analisis performa.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Expo Produk Lokal Indonesia',
                'banner' => 'events/expo-produk-lokal.jpg',
                'tanggal' => '2025-10-10',
                'tempat' => 'Jakarta International Expo',
                'deskripsi' => 'Pameran produk-produk lokal Indonesia terbaik. Kesempatan networking dengan produsen, distributor, dan buyer dari seluruh nusantara.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Seminar Investasi Saham Pemula',
                'banner' => 'events/seminar-investasi.jpg',
                'tanggal' => '2025-10-15',
                'tempat' => 'Hotel Mulia Jakarta',
                'deskripsi' => 'Pelajari dasar-dasar investasi saham untuk pemula. Mulai dari analisis fundamental, teknikal, hingga strategi portfolio yang menguntungkan.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Workshop Content Creation',
                'banner' => 'events/workshop-content.jpg',
                'tanggal' => '2025-10-20',
                'tempat' => 'Studio Kreatif Jakarta',
                'deskripsi' => 'Belajar membuat konten kreatif untuk media sosial dan website. Dari fotografi produk, video editing, hingga copywriting yang menarik.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Business Networking Night',
                'banner' => 'events/networking-night.jpg',
                'tanggal' => '2025-10-25',
                'tempat' => 'Rooftop Bar Jakarta',
                'deskripsi' => 'Acara networking eksklusif untuk para pengusaha dan profesional. Kesempatan membangun relasi bisnis dalam suasana santai dan elegan.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Pelatihan Customer Service Excellence',
                'banner' => 'events/pelatihan-cs.jpg',
                'tanggal' => '2025-11-01',
                'tempat' => 'Training Center Jakarta',
                'deskripsi' => 'Tingkatkan skill customer service untuk memberikan pelayanan terbaik. Pelajari teknik komunikasi, handling complaint, dan customer retention.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Workshop Branding untuk Startup',
                'banner' => 'events/workshop-branding.jpg',
                'tanggal' => '2025-11-05',
                'tempat' => 'Startup Hub Jakarta',
                'deskripsi' => 'Bangun brand yang kuat untuk startup Anda. Mulai dari brand identity, brand positioning, hingga brand communication strategy.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Seminar Pajak untuk Pengusaha',
                'banner' => 'events/seminar-pajak.jpg',
                'tanggal' => '2025-11-10',
                'tempat' => 'Hotel Shangri-La Jakarta',
                'deskripsi' => 'Pahami kewajiban pajak untuk pengusaha. Strategi legal tax planning dan cara menghindari masalah dengan Dirjen Pajak.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Conference Sustainability Business',
                'banner' => 'events/conference-sustainability.jpg',
                'tanggal' => '2025-11-15',
                'tempat' => 'Green Building Jakarta',
                'deskripsi' => 'Konferensi membahas bisnis berkelanjutan dan ramah lingkungan. Trend ESG, green technology, dan sustainable business model.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Workshop Export Import',
                'banner' => 'events/workshop-ekspor.jpg',
                'tanggal' => '2025-11-20',
                'tempat' => 'Kantor Kamar Dagang Jakarta',
                'deskripsi' => 'Pelajari seluk beluk ekspor impor untuk mengembangkan bisnis ke pasar global. Regulasi, dokumentasi, dan strategi penetrasi pasar.',
                'status' => 'ongoing'
            ],
            [
                'nama_event' => 'Seminar HR Management Modern',
                'banner' => 'events/seminar-hr.jpg',
                'tanggal' => '2025-11-25',
                'tempat' => 'Hotel Kempinski Jakarta',
                'deskripsi' => 'Manajemen SDM di era digital. Remote work management, employee engagement, performance management, dan HR analytics.',
                'status' => 'ongoing'
            ],

            // Status: coming soon (15 data)
            [
                'nama_event' => 'Tech Summit Indonesia 2025',
                'banner' => 'events/tech-summit.jpg',
                'tanggal' => '2025-12-01',
                'tempat' => 'Indonesia Convention Exhibition',
                'deskripsi' => 'Summit teknologi terbesar di Indonesia. Membahas AI, blockchain, IoT, dan teknologi emerging lainnya yang akan mengubah masa depan.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'Workshop AI untuk Bisnis',
                'banner' => 'events/workshop-ai.jpg',
                'tanggal' => '2025-12-05',
                'tempat' => 'Tech Hub Jakarta',
                'deskripsi' => 'Implementasi Artificial Intelligence dalam bisnis. Dari chatbot, automation, hingga predictive analytics untuk meningkatkan efisiensi.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'International Trade Expo',
                'banner' => 'events/trade-expo.jpg',
                'tanggal' => '2025-12-10',
                'tempat' => 'Jakarta International Expo',
                'deskripsi' => 'Pameran perdagangan internasional dengan peserta dari 50+ negara. Peluang ekspor, joint venture, dan partnership global.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'Seminar Future of Work',
                'banner' => 'events/future-work.jpg',
                'tanggal' => '2025-12-15',
                'tempat' => 'Universitas Indonesia',
                'deskripsi' => 'Diskusi masa depan dunia kerja post-pandemic. Remote work, gig economy, skill requirements, dan adaptasi teknologi.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'Workshop Blockchain Technology',
                'banner' => 'events/workshop-blockchain.jpg',
                'tanggal' => '2025-12-20',
                'tempat' => 'Cyber Building Jakarta',
                'deskripsi' => 'Memahami teknologi blockchain dan aplikasinya dalam bisnis. Cryptocurrency, smart contracts, dan decentralized applications.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'Green Business Conference',
                'banner' => 'events/green-business.jpg',
                'tanggal' => '2025-12-25',
                'tempat' => 'Eco Convention Center',
                'deskripsi' => 'Konferensi bisnis hijau dan berkelanjutan. Carbon footprint, renewable energy, circular economy, dan green financing.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'Workshop Data Analytics',
                'banner' => 'events/workshop-data.jpg',
                'tanggal' => '2026-01-01',
                'tempat' => 'Data Science Center Jakarta',
                'deskripsi' => 'Belajar analisis data untuk business intelligence. Data visualization, statistical analysis, dan machine learning basics.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'Seminar Cybersecurity',
                'banner' => 'events/seminar-cyber.jpg',
                'tanggal' => '2026-01-05',
                'tempat' => 'Security Operations Center',
                'deskripsi' => 'Keamanan siber untuk bisnis modern. Threat detection, data protection, compliance, dan incident response planning.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'Innovation Challenge 2026',
                'banner' => 'events/innovation-challenge.jpg',
                'tanggal' => '2026-01-10',
                'tempat' => 'Innovation Hub Jakarta',
                'deskripsi' => 'Kompetisi inovasi dengan hadiah miliaran rupiah. Pitch startup ideas, prototype development, dan mentoring dari investor.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'Workshop IoT Implementation',
                'banner' => 'events/workshop-iot.jpg',
                'tanggal' => '2026-01-15',
                'tempat' => 'Smart City Lab Jakarta',
                'deskripsi' => 'Implementasi Internet of Things dalam bisnis. Smart sensors, automation systems, dan data collection strategies.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'Digital Transformation Summit',
                'banner' => 'events/digital-transformation.jpg',
                'tanggal' => '2026-01-20',
                'tempat' => 'Digital Hub Indonesia',
                'deskripsi' => 'Transformasi digital menyeluruh untuk enterprise. Cloud migration, process automation, dan digital culture change.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'Seminar Venture Capital',
                'banner' => 'events/seminar-vc.jpg',
                'tanggal' => '2026-01-25',
                'tempat' => 'Financial District Jakarta',
                'deskripsi' => 'Mendapatkan funding dari venture capital. Pitch deck preparation, valuation, term sheets, dan investor relations.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'Workshop Agile Management',
                'banner' => 'events/workshop-agile.jpg',
                'tanggal' => '2026-02-01',
                'tempat' => 'Agile Center Jakarta',
                'deskripsi' => 'Metodologi agile untuk manajemen proyek modern. Scrum, Kanban, sprint planning, dan continuous improvement.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'International Startup Festival',
                'banner' => 'events/startup-festival.jpg',
                'tanggal' => '2026-02-05',
                'tempat' => 'Startup Valley Indonesia',
                'deskripsi' => 'Festival startup internasional dengan demo day, networking, workshop, dan investor showcase. 500+ startup participants.',
                'status' => 'coming soon'
            ],
            [
                'nama_event' => 'Workshop Cloud Computing',
                'banner' => 'events/workshop-cloud.jpg',
                'tanggal' => '2026-02-10',
                'tempat' => 'Cloud Data Center Jakarta',
                'deskripsi' => 'Migrasi ke cloud computing untuk efisiensi bisnis. AWS, Azure, Google Cloud, dan hybrid cloud strategies.',
                'status' => 'coming soon'
            ],

            // Status: ended (15 data)
            [
                'nama_event' => 'Business Excellence Awards 2024',
                'banner' => 'events/business-awards.jpg',
                'tanggal' => '2024-12-15',
                'tempat' => 'Ballroom Hotel Indonesia',
                'deskripsi' => 'Penghargaan untuk perusahaan terbaik Indonesia 2024. Kategori innovation, sustainability, growth, dan customer satisfaction.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'Workshop Leadership Skills',
                'banner' => 'events/leadership-workshop.jpg',
                'tanggal' => '2024-11-20',
                'tempat' => 'Leadership Institute Jakarta',
                'deskripsi' => 'Pengembangan kemampuan kepemimpinan untuk manajer dan direktur. Team building, decision making, dan strategic thinking.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'Retail Innovation Expo',
                'banner' => 'events/retail-expo.jpg',
                'tanggal' => '2024-10-25',
                'tempat' => 'Jakarta Convention Center',
                'deskripsi' => 'Pameran inovasi ritel modern. Omnichannel strategy, POS systems, inventory management, dan customer experience.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'Seminar Digital Banking',
                'banner' => 'events/digital-banking.jpg',
                'tanggal' => '2024-09-30',
                'tempat' => 'Bank Indonesia Building',
                'deskripsi' => 'Transformasi perbankan digital di Indonesia. Fintech collaboration, open banking, dan regulatory framework.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'Workshop Supply Chain Management',
                'banner' => 'events/supply-chain.jpg',
                'tanggal' => '2024-08-15',
                'tempat' => 'Logistics Center Jakarta',
                'deskripsi' => 'Optimasi supply chain untuk efisiensi maksimal. Demand forecasting, vendor management, dan logistics optimization.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'International Business Forum',
                'banner' => 'events/business-forum.jpg',
                'tanggal' => '2024-07-20',
                'tempat' => 'World Trade Center Jakarta',
                'deskripsi' => 'Forum bisnis internasional dengan delegasi dari 30 negara. Trade opportunities, investment climate, dan business matching.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'Workshop Quality Management',
                'banner' => 'events/quality-management.jpg',
                'tanggal' => '2024-06-25',
                'tempat' => 'Quality Institute Jakarta',
                'deskripsi' => 'Sistem manajemen kualitas ISO 9001. Process improvement, quality control, dan customer satisfaction measurement.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'Seminar Crisis Management',
                'banner' => 'events/crisis-management.jpg',
                'tanggal' => '2024-05-30',
                'tempat' => 'Crisis Center Jakarta',
                'deskripsi' => 'Manajemen krisis dalam bisnis. Risk assessment, contingency planning, communication strategy, dan recovery planning.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'Technology Innovation Awards',
                'banner' => 'events/tech-awards.jpg',
                'tanggal' => '2024-04-15',
                'tempat' => 'Tech Park Indonesia',
                'deskripsi' => 'Penghargaan inovasi teknologi terbaik Indonesia. Kategori AI, fintech, edtech, healthtech, dan agritech.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'Workshop Project Management',
                'banner' => 'events/project-management.jpg',
                'tanggal' => '2024-03-20',
                'tempat' => 'PMI Jakarta Chapter',
                'deskripsi' => 'Sertifikasi project management professional. Planning, execution, monitoring, controlling, dan closing projects.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'Women Entrepreneur Summit',
                'banner' => 'events/women-entrepreneur.jpg',
                'tanggal' => '2024-02-25',
                'tempat' => 'Women Center Jakarta',
                'deskripsi' => 'Summit khusus untuk pengusaha wanita. Empowerment, networking, funding opportunities, dan success stories.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'Seminar Intellectual Property',
                'banner' => 'events/intellectual-property.jpg',
                'tanggal' => '2024-01-30',
                'tempat' => 'IP Law Center Jakarta',
                'deskripsi' => 'Perlindungan kekayaan intelektual untuk bisnis. Patent, trademark, copyright, dan trade secret protection.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'Workshop Performance Management',
                'banner' => 'events/performance-management.jpg',
                'tanggal' => '2023-12-15',
                'tempat' => 'HR Excellence Center',
                'deskripsi' => 'Sistem manajemen kinerja karyawan. KPI setting, performance review, coaching, dan talent development.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'Startup Pitch Competition',
                'banner' => 'events/pitch-competition.jpg',
                'tanggal' => '2023-11-20',
                'tempat' => 'Startup Arena Jakarta',
                'deskripsi' => 'Kompetisi pitch startup dengan total hadiah 5 miliar rupiah. 100 startup, 50 investor, dan 20 mentor.',
                'status' => 'ended'
            ],
            [
                'nama_event' => 'Workshop Business Model Innovation',
                'banner' => 'events/business-model.jpg',
                'tanggal' => '2023-10-25',
                'tempat' => 'Innovation Lab Jakarta',
                'deskripsi' => 'Inovasi model bisnis untuk era digital. Business model canvas, value proposition, dan monetization strategy.',
                'status' => 'ended'
            ]
        ];

        foreach ($events as $eventData) {
            Event::create($eventData);
        }
    }
}
