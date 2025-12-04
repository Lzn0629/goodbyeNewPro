window.addEventListener("DOMContentLoaded", () => {
  // 動態設定內容區 margin-top
  const header = document.querySelector('.header');
  const content = document.querySelector('.main-content');
  if (header && content) {
    content.style.marginTop = header.offsetHeight + 'px';
  }

  // 阻止 quantity-input 的上下鍵改變數值
  document.querySelectorAll('.quantity-input').forEach((input) => {
    input.addEventListener('keydown', (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    });
  });
});

// 增加數量
function increaseQty(btn) {
  const input = btn.parentNode.querySelector('input[name="quantity"]');
  let current = parseInt(input.value) || 1;
  input.value = current + 1;
}

// 減少數量（不能小於 1）
function decreaseQty(btn) {
  const input = btn.parentNode.querySelector('input[name="quantity"]');
  let current = parseInt(input.value) || 1;
  if (current > 1) {
    input.value = current - 1;
  }
}

document.addEventListener('DOMContentLoaded', function() {
    // 切換圖片
    const mainImage = document.getElementById('main-image');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 更新主圖片
            mainImage.src = this.dataset.src;
            
            // 更新選取狀態
            galleryItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

// === 新增：商店複製按鈕 ===
  const copyBtn = document.querySelector('.js-copy-shop');
  if (copyBtn) {
    copyBtn.addEventListener('click', function (e) {
      e.preventDefault();  // 先阻止預設跳轉，成功/失敗再決定要不要跳轉

      const url = this.dataset.url;
      if (!url) {
        alert('找不到複製連結');
        return;
      }

      fetch(url, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'same-origin'
      })
      .then(res => res.json())
      .then(data => {
        if (!data.ok) {
          alert(data.error || '複製失敗，請稍後再試');
          return;
        }

        const text = data.text || '';
        return navigator.clipboard.writeText(text)
          .then(() => {
                window.location.href = window.location.href;  
          })
          .catch(() => {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.top = '-9999px';
            document.body.appendChild(ta);

            ta.select();
            try {
              document.execCommand('copy');
              window.location.href = window.location.href;  
            } catch (err) {
              alert('複製失敗，請手動長按貼上區塊複製。');
            }
            document.body.removeChild(ta);
          });
      })
      .catch(() => {
        alert('連線失敗，請稍後再試');
        // 也可以在這裡 fallback 回原本的跳轉
        // window.location.href = copyBtn.href;
      });
    });
  }
});
