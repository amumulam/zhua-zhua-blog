'use client'

import ActivityCalendar, { Activity } from 'react-activity-calendar'
import { useState } from 'react'

interface HeatmapDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
  summary: string
}

interface LearningHeatmapProps {
  data: HeatmapDay[]
}

export function LearningHeatmap({ data }: LearningHeatmapProps) {
  const [tooltip, setTooltip] = useState<{ date: string; summary: string; count: number } | null>(null)

  const calendarData: Activity[] = data.map(day => ({
    date: day.date,
    count: day.count,
    level: day.level,
  }))

  return (
    <div className="relative">
      <ActivityCalendar
        data={calendarData}
        blockSize={12}
        blockRadius={2}
        colorScheme="light"
        theme={{
          light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
          dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        }}
        showWeekdayLabels
        labels={{
          months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          weekdays: ['日', '一', '二', '三', '四', '五', '六'],
          totalCount: '过去 {{count}} 天',
          legend: {
            less: '少',
            more: '多',
          },
        }}
      />
      
      {/* Tooltip */}
      {tooltip && (
        <div className="absolute z-10 p-2 bg-gray-900 text-white text-sm rounded shadow-lg pointer-events-none">
          <div className="font-semibold">{tooltip.date}</div>
          <div>{tooltip.summary || '没有学习记录'}</div>
          <div className="text-xs text-gray-400">学习活动：{tooltip.count}</div>
        </div>
      )}
    </div>
  )
}
