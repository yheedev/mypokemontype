'use client'

import Card from '@/components/UI/Card'
import Divider from '@/components/UI/Divider'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { PATH } from '@/app/routes'
import Title from '@/components/UI/Title'
import AllBtns from '@/components/UI/Buttons/AllBtns'
import Favicon from '@/components/UI/Favicon'

export default function notFoundPage() {
  const { t } = useTranslation()

  return (
    <main>
      <Favicon />
      <Title />
      <div
        aria-hidden
        className="anim-sweep pointer-events-none absolute top-1/3 left-0 transform-gpu"
      >
        <img
          src="/img/LucarioDoll.webp"
          alt=""
          draggable="false"
          className="rotate-[50deg] opacity-70 select-none"
        />
      </div>
      <Card className="flex-row flex-wrap items-center justify-center gap-8 p-12 sm:mx-8 sm:mt-12 sm:mb-8 md:mx-44 md:my-16">
        <div className="flex flex-col gap-y-6">
          {' '}
          <h1 className="font-[Helios] text-7xl font-bold italic">404</h1>
          <p className="text-lg font-medium text-[var(--defenseRec)]">
            {t('notFound.description')}
          </p>
          <button className="h-20 w-32 border-4 bg-amber-950">
            {t('notFound.backToMain')}
            <Link
              href={PATH().offense}
              className="mt-6 rounded bg-[--offenseRec] px-6 py-2 font-semibold text-white hover:opacity-90"
            ></Link>
          </button>
        </div>
      </Card>
      <AllBtns />
    </main>
  )
}

// TODO
// [ ] 버튼 이동시 메인 페이지로 이동 가능해야
// [ ] 버튼 UI
// [ ] 루카리오 애니메이션 수정
