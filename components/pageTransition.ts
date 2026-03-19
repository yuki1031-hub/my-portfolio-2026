/**
 * ページ離脱時のトランジション（白フェードアウト）
 * 入場側は CSS .pageEnter アニメーション（globals.css）が担当。
 * scale(0.95)→1 / opacity: 0→1 の「呼吸」エフェクト。
 */
export async function runPageTransition(): Promise<void> {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      zIndex: '99999',
      background: '#ffffff',
      opacity: '0',
      pointerEvents: 'all',
    });
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.transition = 'opacity 0.35s ease';  /* ふんわり */
      overlay.style.opacity = '1';
    });

    // フェードイン完了後に遷移を解放
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
      resolve();
    }, 370);
  });
}
