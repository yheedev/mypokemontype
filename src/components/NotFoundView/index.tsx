'use client'

import Card from '@/components/UI/Card'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { PATH } from '@/app/routes'
import Title from '@/components/UI/Title'
import Favicon from '@/components/UI/Favicon'

export default function notFoundPage() {
  const { t } = useTranslation()

  return (
    <main>
      <Favicon />
      <Title />
      <Card className="m-8 flex-wrap items-center justify-center gap-y-10 p-12 sm:mx-8 sm:mt-12 sm:mb-8 md:mx-44 md:my-16">
        <div aria-hidden className="pointer-events-none transform-gpu">
          <img
            src="/img/LucarioDoll.webp"
            alt={t(`lucario.aria-label`)}
            draggable="false"
            className="w-48 [animation:sway-loop_8s_ease-in-out_infinite] opacity-70 will-change-[transform] select-none sm:w-64"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-y-4 text-center">
          <h1 className="font-[Helios] text-4xl font-bold italic sm:text-7xl">
            404
          </h1>
          <p className="font-[NotoSans] text-lg font-medium">
            {t('notFound.description')}
          </p>
          <Link
            href={PATH().offense}
            className="btnShadow flex h-16 w-32 items-center justify-center rounded-xl border-8 border-none bg-[var(--defenseRec)] font-[NotoSans] hover:opacity-90"
          >
            <span className="">{t('notFound.backToMain')}</span>
          </Link>
        </div>
      </Card>
    </main>
  )
}

// TODO
// [x] 404 페이지에서 언어 변경
// [x] 버튼 이동시 메인 페이지로 이동 가능해야 (button link 중첩X)
// [x] 버튼 UI
// [x] 루카리오 애니메이션 수정
