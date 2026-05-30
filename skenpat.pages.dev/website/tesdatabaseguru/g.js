document.addEventListener('DOMContentLoaded', function() {
    // URL CSV Google Spreadsheet
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmOaIjXmtY3dnOWCRs4YvV4a8fv9ri-PVLHzGWpQkclFRC1OiPotJZjYmx41ORMGK-kFJsuaxt94oB/pub?output=csv';
    
    // Elemen DOM
    const loadingIndicator = document.getElementById('loadingIndicator');
    const dashboardContent = document.getElementById('dashboardContent');
    const lastUpdateElement = document.querySelector('.last-update');
    const totalReportsElement = document.getElementById('totalReports');
    const nihilReportsElement = document.getElementById('nihilReports');
    const absentTeachersElement = document.getElementById('absentTeachers');
    const tableBody = document.getElementById('tableBody');
    const searchInput = document.getElementById('searchInput');
    
    // Elemen insight
    const lastUpdateInsight = document.getElementById('lastUpdateInsight');
    const nihilPercentageInsight = document.getElementById('nihilPercentageInsight');
    const mostAbsentInsight = document.getElementById('mostAbsentInsight');
    
    // Variabel untuk menyimpan data
    let csvData = [];
    let processedData = [];
    let filteredData = [];
    
    // Fetch data dari CSV
    fetch(csvUrl)
        .then(response => response.text())
        .then(csvText => {
            // Parse CSV menggunakan PapaParse
            Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    csvData = results.data;
                    
                    // Proses data CSV
                    processCSVData();
                    
                    // Update dashboard dengan data
                    updateDashboard();
                    
                    // Tampilkan dashboard dan sembunyikan loading
                    loadingIndicator.style.display = 'none';
                    dashboardContent.style.display = 'block';
                }
            });
        })
        .catch(error => {
            console.error('Error fetching CSV data:', error);
            loadingIndicator.innerHTML = '<p>Gagal memuat data. Silakan coba lagi nanti.</p>';
        });
    
    // Fungsi untuk memproses data CSV
    function processCSVData() {
        processedData = [];
        let nihilCount = 0;
        
        for (let row of csvData) {
            const dateStr = row["Untitled Question"] || '';
            const classX = row["KELAS X"] || '';
            const classXI = row["KELAS XI"] || '';
            const guruInfo = row["Tuliskan nama guru yang tidak masuk kelas hari ini, sesuai contoh di bawah. \nFormatnya : \nNama Guru, Tugas, Keterangan"] || '';
            
            // Periksa apakah guruInfo adalah NIHIL
            if (guruInfo.trim().toUpperCase() === "NIHIL") {
                nihilCount++;
                processedData.push({
                    date: dateStr,
                    classX: classX,
                    classXI: classXI,
                    teacherName: null,
                    task: null,
                    note: null,
                    isNihil: true
                });
            } else {
                // Pisahkan guruInfo berdasarkan baris baru
                const teacherEntries = guruInfo.split('\n');
                for (let entry of teacherEntries) {
                    entry = entry.trim();
                    if (entry === '') continue;
                    
                    // Pisahkan entry berdasarkan koma
                    const parts = entry.split(',').map(part => part.trim());
                    const teacherName = parts[0] || '';
                    const task = parts[1] || '';
                    const note = parts.length > 2 ? parts.slice(2).join(', ') : (parts[2] || '');
                    
                    processedData.push({
                        date: dateStr,
                        classX: classX,
                        classXI: classXI,
                        teacherName: teacherName,
                        task: task,
                        note: note,
                        isNihil: false
                    });
                }
            }
        }
        
        // Set filteredData ke semua data yang telah diproses
        filteredData = [...processedData];
        
        // Update statistik
        totalReportsElement.textContent = csvData.length;
        nihilReportsElement.textContent = nihilCount;
        absentTeachersElement.textContent = processedData.length - nihilCount;
    }
    
    // Fungsi untuk update dashboard
    function updateDashboard() {
        // Update tanggal terakhir
        updateLastUpdateDate();
        
        // Update tabel
        updateTable();
        
        // Update grafik
        updateCharts();
        
        // Update insight
        updateInsights();
        
        // Setup event listener untuk pencarian
        setupSearch();
    }
    
    // Fungsi untuk update tanggal terakhir
    function updateLastUpdateDate() {
        if (csvData.length > 0) {
            const lastDate = csvData[csvData.length - 1]["Untitled Question"];
            if (lastDate) {
                const formattedDate = new Date(lastDate).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                lastUpdateElement.textContent = `Data terakhir diupdate: ${formattedDate}`;
                lastUpdateInsight.textContent = `📅 Data terakhir diupdate pada: ${formattedDate}`;
            }
        }
    }
    
    // Fungsi untuk update tabel
    function updateTable() {
        // Kosongkan tabel
        tableBody.innerHTML = '';
        
        // Tambahkan data ke tabel
        filteredData.forEach(row => {
            const tr = document.createElement('tr');
            
            // Tambahkan kelas berdasarkan keterangan
            if (row.isNihil) {
                tr.classList.add('nihil-row');
            } else {
                tr.classList.add('absent-row');
            }
            
            // Format tanggal
            const formattedDate = row.date ? new Date(row.date).toLocaleDateString('id-ID') : '-';
            
            // Buat sel untuk setiap kolom
            tr.innerHTML = `
                <td>${formattedDate}</td>
                <td>${row.classX || '-'}</td>
                <td>${row.classXI || '-'}</td>
                <td>${row.teacherName || '-'}</td>
                <td>${row.task || '-'}</td>
                <td>${row.note || (row.isNihil ? 'NIHIL' : '-')}</td>
            `;
            
            tableBody.appendChild(tr);
        });
    }
    
    // Fungsi untuk update grafik
    function updateCharts() {
        // Data untuk grafik perbandingan
        const nihilReports = processedData.filter(row => row.isNihil).length;
        const absentReports = processedData.filter(row => !row.isNihil).length;
        
        // Grafik perbandingan
        const comparisonCtx = document.getElementById('comparisonChart').getContext('2d');
        new Chart(comparisonCtx, {
            type: 'pie',
            data: {
                labels: ['NIHIL', 'Guru Tidak Hadir'],
                datasets: [{
                    data: [nihilReports, absentReports],
                    backgroundColor: [
                        'rgba(76, 175, 80, 0.7)',
                        'rgba(255, 235, 59, 0.7)'
                    ],
                    borderColor: [
                        'rgba(76, 175, 80, 1)',
                        'rgba(255, 235, 59, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
        
        // Data untuk grafik frekuensi per kelas
        const classFrequency = {};
        csvData.forEach(row => {
            if (row["KELAS X"]) {
                classFrequency[row["KELAS X"]] = (classFrequency[row["KELAS X"]] || 0) + 1;
            }
            if (row["KELAS XI"]) {
                classFrequency[row["KELAS XI"]] = (classFrequency[row["KELAS XI"]] || 0) + 1;
            }
        });
        
        const classLabels = Object.keys(classFrequency);
        const classData = Object.values(classFrequency);
        
        // Grafik frekuensi per kelas
        const classFrequencyCtx = document.getElementById('classFrequencyChart').getContext('2d');
        new Chart(classFrequencyCtx, {
            type: 'bar',
            data: {
                labels: classLabels,
                datasets: [{
                    label: 'Jumlah Laporan',
                    data: classData,
                    backgroundColor: 'rgba(74, 144, 226, 0.7)',
                    borderColor: 'rgba(74, 144, 226, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Fungsi untuk update insight
    function updateInsights() {
        // Hitung persentase NIHIL
        const nihilReports = processedData.filter(row => row.isNihil).length;
        const totalReports = processedData.length;
        const nihilPercentage = totalReports > 0 ? Math.round((nihilReports / totalReports) * 100) : 0;
        nihilPercentageInsight.textContent = `✅ ${nihilPercentage}% laporan menyatakan nihil.`;
        
        // Cari guru yang paling sering tidak hadir
        const absentCount = {};
        processedData.forEach(row => {
            if (!row.isNihil && row.teacherName) {
                absentCount[row.teacherName] = (absentCount[row.teacherName] || 0) + 1;
            }
        });
        
        let mostAbsentTeacher = 'Tidak ada data';
        if (Object.keys(absentCount).length > 0) {
            mostAbsentTeacher = Object.keys(absentCount).reduce((a, b) => absentCount[a] > absentCount[b] ? a : b);
        }
        mostAbsentInsight.textContent = `⚠️ Guru yang paling sering tercatat tidak hadir: ${mostAbsentTeacher}.`;
    }
    
    // Fungsi untuk setup pencarian
    function setupSearch() {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            if (searchTerm === '') {
                filteredData = [...processedData];
            } else {
                filteredData = processedData.filter(row => {
                    // Cari di kolom kelas dan nama guru
                    const classX = (row.classX || '').toLowerCase();
                    const classXI = (row.classXI || '').toLowerCase();
                    const teacherName = (row.teacherName || '').toLowerCase();
                    
                    return classX.includes(searchTerm) || 
                           classXI.includes(searchTerm) || 
                           teacherName.includes(searchTerm);
                });
            }
            
            // Update tabel dengan data yang sudah difilter
            updateTable();
        });
    }
});
