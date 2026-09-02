(() => {
  const PASSCODE = '600119';

  document.documentElement.classList.add('security-pending');
  document.write(`
    <style>
      .security-pending body > .app { visibility: hidden !important; }
      #securityLock {
        position: fixed; z-index: 2147483647; inset: 0; display: grid;
        place-items: center; padding: 20px; background: radial-gradient(circle at 50% 0, #19345b, #07101d 65%);
        color: #f5f7fc; font: 15px/1.4 system-ui, sans-serif;
      }
      .security-card { width: min(410px, 100%); padding: 32px 28px; text-align: center; border: 1px solid #49688e; border-radius: 20px; background: #111d2f; box-shadow: 0 24px 70px #0009; }
      .security-card h1 { margin: 10px 0 6px; font-size: 30px; font-style: italic; text-transform: uppercase; }
      .security-card p { margin: 0 0 22px; color: #aab9d1; }
      .security-icon { font-size: 42px; }
      .security-form { display: grid; gap: 10px; }
      .security-form input { width: 100%; padding: 13px; box-sizing: border-box; border: 1px solid #4c6688; border-radius: 9px; background: #08111f; color: #fff; text-align: center; font-size: 22px; font-weight: 800; letter-spacing: .22em; }
      .security-form input:focus { outline: 2px solid #ffd34e; outline-offset: 2px; }
      .security-form button { border: 0; border-radius: 9px; padding: 12px; background: #ffd34e; color: #171207; font: 800 15px system-ui, sans-serif; cursor: pointer; }
      .security-error { min-height: 20px; margin: 5px 0 0 !important; color: #ff9aaa !important; font-size: 13px; font-weight: 700; }
    </style>
  `);

  window.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('afterbegin', `
      <section id="securityLock" aria-labelledby="securityTitle">
        <div class="security-card">
          <div class="security-icon" aria-hidden="true">🔒</div>
          <h1 id="securityTitle">PCY Badminton</h1>
          <p>Enter the security code to open the tournament dashboard.</p>
          <form class="security-form" id="securityForm">
            <input id="securityCode" type="password" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" aria-label="Six digit security code" autofocus required>
            <button type="submit">Open dashboard</button>
          </form>
          <p class="security-error" id="securityError" role="alert" aria-live="polite"></p>
        </div>
      </section>
    `);

    const form = document.querySelector('#securityForm');
    const input = document.querySelector('#securityCode');
    const error = document.querySelector('#securityError');

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (input.value === PASSCODE) {
        document.querySelector('#securityLock').remove();
        document.documentElement.classList.remove('security-pending');
        return;
      }
      error.textContent = 'Incorrect security code. Please try again.';
      input.value = '';
      input.focus();
    });

    input.focus();
  });
})();
