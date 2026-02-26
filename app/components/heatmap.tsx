'use client'

import { ActivityCalendar, Activity } from 'react-activity-calendar'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface HeatmapDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
  summary: string
  hasDiary: boolean
  diarySlug?: string
}

interface LearningHeatmapProps {
  data: HeatmapDay[]
}

export function LearningHeatmap({ data }: LearningHeatmapProps) {
  const [tooltip, setTooltip] = useState<{ date: string; summary: string; count: number } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const calendarData: Activity[] = data.map(day => ({
    date: day.date,
    count: day.count,
    level: day.level,
  }))

  // 创建日期到日记的映射
  const diaryMap = new Map(
    data.filter(d => d.hasDiary).map(d => [d.date, d.diarySlug])
  )

  // 滚动到最近时间（最右侧）
  useEffect(() => {
    if (containerRef.current) {
      const scrollContainer = containerRef.current.querySelector('.react-activity-calendar__scroll-container')
      if (scrollContainer) {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <ActivityCalendar
        data={calendarData}
        blockSize={12}
        blockRadius={2}
        colorScheme="light"
        theme={{
          light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
          dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        }}
        showWeekdayLabels={false}
        labels={{
          months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          totalCount: 'Last {{count}} days',
          legend: {
            less: 'Less',
            more: 'More',
          },
        }}
        renderBlock={(block, activity) => {
          const diarySlug = diaryMap.get(activity.date)
          if (diarySlug) {
            return (
              <Link href={`/diary/${diarySlug}`} className="inline-block">
                {block}
              </Link>
            )
          }
          return block
        }}
      />
      
      {/* Tooltip */}
      {tooltip && (
        <div className="absolute z-10 p-2 bg-gray-900 text-white text-sm rounded shadow-lg pointer-events-none">
          <div className="font-semibold">{tooltip.date}</div>
          <div>{tooltip.summary || 'No activity'}</div>
          <div className="text-xs text-gray-400">Activity: {tooltip.count}</div>
        </div>
      )}
    </div>
  )
}
