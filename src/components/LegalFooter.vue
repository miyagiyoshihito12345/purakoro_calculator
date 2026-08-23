<template>
  <footer class="border-t border-slate-200 bg-white px-4 py-8 text-slate-600">
    <div class="mx-auto max-w-6xl">
      <div class="text-center">
        <p class="text-sm font-black text-[#17233c]">プラコロ電卓</p>
        <p class="mt-1 text-xs font-bold">個人が運営する非公式の確率計算ツールです。</p>
        <a
          class="mt-4 inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-black text-[#2563a6] transition hover:border-blue-300 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563a6]"
          href="https://docs.google.com/forms/d/e/1FAIpQLScttLSOKQYnG59XoeUfwC_PvagUfAanxhrlBDhxoC6sCj-fPg/viewform"
          target="_blank"
          rel="noopener noreferrer"
        >
          お問い合わせフォーム
          <span class="ml-1" aria-hidden="true">↗</span>
        </a>
      </div>

      <div class="mt-6 space-y-2">
        <details id="terms" class="group rounded-xl border border-slate-200 bg-white">
          <summary
            class="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-black text-[#17233c]"
          >
            利用規約
            <span class="transition group-open:rotate-180" aria-hidden="true">⌄</span>
          </summary>
          <div class="border-t border-slate-100 px-4 py-4 text-xs leading-6 sm:text-sm">
            <ol class="list-decimal space-y-2 pl-5">
              <li>本ツールは、プラコロのワザ成功確率を確認するための非公式ツールです。</li>
              <li>
                掲載情報および計算結果の正確性、完全性、最新性を保証するものではありません。公式ルールや商品情報もあわせてご確認ください。
              </li>
              <li>
                本ツールの利用または利用不能によって生じた損害、損失、トラブルその他の不利益について、運営者は法令上認められる範囲で責任を負いません。
              </li>
              <li>
                本ツールの運営を妨害する行為、第三者の権利を侵害する行為、法令または公序良俗に反する行為を禁止します。
              </li>
              <li>
                運営者は、予告なく本ツールの内容変更、提供中断または終了を行う場合があります。
              </li>
              <li>本ツールを利用する際は、本規約の内容をご確認ください。</li>
            </ol>
          </div>
        </details>

        <details id="privacy" class="group rounded-xl border border-slate-200 bg-white">
          <summary
            class="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-black text-[#17233c]"
          >
            プライバシーポリシー
            <span class="transition group-open:rotate-180" aria-hidden="true">⌄</span>
          </summary>
          <div class="border-t border-slate-100 px-4 py-4 text-xs leading-6 sm:text-sm">
            <ul class="list-disc space-y-2 pl-5">
              <li>
                本ツールは、氏名、メールアドレスその他の個人情報を入力する機能を提供しておらず、利用者の個人情報を意図的に収集しません。
              </li>
              <li>
                選択したキャラクター、ワザカード、エネコロおよび計算結果はブラウザ内で処理され、サーバーへ送信または永続保存されません。
              </li>
              <li>本ツール独自のCookie、アクセス解析、広告配信ツールは使用していません。</li>
              <li>
                お問い合わせにはGoogleフォームを使用しています。フォームに入力された情報は、お問い合わせへの回答および必要な対応のために利用します。Googleによる情報の取り扱いについては、Googleが定めるプライバシーポリシーが適用されます。
              </li>
              <li>
                ホスティングに利用しているGitHub
                Pagesでは、サービス提供やセキュリティ等のためにGitHubがアクセス情報を処理する場合があります。詳細は
                <a
                  class="font-bold text-[#2563a6] underline hover:text-blue-500"
                  href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement"
                  target="_blank"
                  rel="noopener noreferrer"
                  >GitHubのプライバシーステートメント</a
                >をご確認ください。
              </li>
              <li>外部サイトでは、各サイトが定めるプライバシーポリシーが適用されます。</li>
            </ul>
            <p class="mt-3 text-slate-500">制定日：2026年8月23日</p>
          </div>
        </details>

        <details id="disclaimer" class="group rounded-xl border border-slate-200 bg-white">
          <summary
            class="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-black text-[#17233c]"
          >
            免責事項・知的財産権について
            <span class="transition group-open:rotate-180" aria-hidden="true">⌄</span>
          </summary>
          <div class="space-y-3 border-t border-slate-100 px-4 py-4 text-xs leading-6 sm:text-sm">
            <p>
              本ツールに掲載している商品名、キャラクター名その他の情報に関する著作権、商標権その他の知的財産権は、各権利者に帰属します。運営者はこれらの権利を保有している旨を主張するものではありません。
            </p>
            <p>
              「ポケットモンスター」「ポケモン」「Pokémon」は、任天堂・クリーチャーズ・ゲームフリークの商標です。「プラコロ」は株式会社BANDAI
              SPIRITSが発売する商品です。
            </p>
            <p>
              本ツールは個人が運営する非公式ファンツールであり、株式会社ポケモン、株式会社BANDAI
              SPIRITS、任天堂株式会社、株式会社クリーチャーズ、株式会社ゲームフリークその他の関係各社とは一切関係ありません。
            </p>
            <p>
              掲載内容について権利者から修正または削除等の要請があった場合は、内容を確認のうえ適切に対応します。
            </p>
          </div>
        </details>
      </div>
    </div>
  </footer>
</template>
