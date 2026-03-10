// ИНИЦИАЛИЗАЦИЯ СОБЫТИЙ
document.addEventListener('DOMContentLoaded', () => {
    initializeCategories();
    initializeVideoCards();
    initializeModal();
});

// ============================================
// КАК ДОБАВЛЯТЬ НОВЫЕ ВИДЕО:
// ============================================
// 1. Откройте index.html
// 2. Найдите нужную категорию (top, directed, other)
// 3. Скопируйте блок с классом "video-card"
// 4. Замените:
//    - data-youtube="VIDEO_ID" → ID из ссылки YouTube
//    - src="videos/previewX.mp4" → путь к превью видео
//    - <h3> → название видео
//    - <p> → описание (артисты, продюсеры и т.д.)
//
// ПРИМЕР:
// Для https://www.youtube.com/watch?v=AvYx2WhLhYE
// Вставляете: data-youtube="AvYx2WhLhYE"
// ============================================

// ============================================
// РЕКОМЕНДАЦИИ ДЛЯ ДИНАМИЧНОГО ПРЕВЬЮ:
// ============================================
// ФОРМАТ: MP4 (H.264, 30 fps)
// КОДЕК ВИДЕО: H.264 (libx264)
// КОДЕК АУДИО: AAC
// 
// ТЕХНИЧЕСКИЕ ПАРАМЕТРЫ:
// Разрешение: 1280x720px (HD) или 1920x1080px (Full HD)
// Битрейт видео: 2000-3000 kbps
// Битрейт аудио: 128 kbps
// Длительность: 8-15 секунд
// Кадры в секунду: 30 fps
// Размер файла: 3-5 МБ (примерно)
//
// КОМАНДА FFmpeg для оптимизации:
// ffmpeg -i input.mp4 -vf "scale=1280:720" -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 128k -t 12 -r 30 output.mp4
//
// Расшифровка параметров:
// -vf "scale=1280:720" = масштабирование до 1280x720
// -c:v libx264 = кодек видео H.264
// -crf 23 = качество (0-51, чем ниже тем лучше, 23 - хороший баланс)
// -preset fast = скорость кодирования (medium, fast, faster)
// -c:a aac = кодек аудио AAC
// -b:a 128k = битрейт аудио
// -t 12 = длительность 12 секунд
// -r 30 = 30 кадров в секунду
//
// ХОСТИНГ ПРЕВЬЮ:
// Можешь закинуть видео прямо в репозиторий в папку /videos
// ИЛИ использовать CDN (Cloudinary, ImgBB и т.д.)
// ============================================

// ПЕРЕКЛЮЧЕНИЕ КАТЕГОРИЙ
function initializeCategories() {
    const buttons = document.querySelectorAll('.category-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Удаляем активный класс со всех кнопок
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Скрываем все категории
            const sections = document.querySelectorAll('.category-section');
            sections.forEach(section => section.classList.add('hidden'));
            
            // Показываем выбранную категорию
            const category = button.getAttribute('data-category');
            const activeSection = document.querySelector(`.category-section[data-category="${category}"]`);
            if (activeSection) {
                activeSection.classList.remove('hidden');
            }
        });
    });
}

// ОТКРЫТИЕ МОДАЛЬНОГО ПЛЕЕРА
function initializeVideoCards() {
    const cards = document.querySelectorAll('.video-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const youtubeId = card.getAttribute('data-youtube');
            openModal(youtubeId);
        });
    });
}

// УПРАВЛЕНИЕ МОДАЛЬНЫМ ОКНОМ
function initializeModal() {
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', () => {
        closeModal();
    });
    
    // Закрытие при клике вне плеера
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА С ВИДЕО
function openModal(youtubeId) {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('youtubePlayer');
    const youtubeLink = document.getElementById('youtubeLink');
    
    // Устанавливаем src для iframe с YouTube видео
    player.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    
    // Устанавливаем ссылку на YouTube
    youtubeLink.href = `https://www.youtube.com/watch?v=${youtubeId}`;
    
    // Показываем модальное окно
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Блокируем скролл
}

// ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
function closeModal() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('youtubePlayer');
    
    modal.classList.add('hidden');
    player.src = ''; // Останавливаем видео
    document.body.style.overflow = 'auto'; // Возвращаем скролл
}
