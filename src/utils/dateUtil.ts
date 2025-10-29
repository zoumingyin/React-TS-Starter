import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/zh-cn';

// 扩展 dayjs
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);
dayjs.extend(duration);



/**
 * 日期工具类
 */
export const dateUtil = {
  /**
   * 格式化日期
   * @param date - 日期（Dayjs | string | null | undefined）
   * @param format - 格式字符串，默认 'YYYY-MM-DD'
   * @returns 格式化后的日期字符串
   */
  format: (date: Dayjs | string | null | undefined, format = 'YYYY-MM-DD'): string => {
    if (!date) return '';
    return dayjs(date).format(format);
  },

  /**
   * 格式化日期时间
   * @param date - 日期
   * @returns 'YYYY-MM-DD HH:mm:ss'
   */
  formatDateTime: (date: Dayjs | string | null | undefined): string => {
    return dateUtil.format(date, 'YYYY-MM-DD HH:mm:ss');
  },

  /**
   * 格式化时间
   * @param date - 日期
   * @returns 'HH:mm:ss'
   */
  formatTime: (date: Dayjs | string | null | undefined): string => {
    return dateUtil.format(date, 'HH:mm:ss');
  },

  /**
   * 获取今天（开始时间）
   * @returns Dayjs 对象
   */
  today: () => dayjs().startOf('day'),

  /**
   * 获取昨天（开始时间）
   * @returns Dayjs 对象
   */
  yesterday: () => dayjs().subtract(1, 'day').startOf('day'),

  /**
   * 获取本周开始和结束
   * @returns 包含 start 和 end 的对象
   */
  thisWeek: () => ({
    start: dayjs().startOf('week'),
    end: dayjs().endOf('week'),
  }),

  /**
   * 获取上周开始和结束
   * @returns 包含 start 和 end 的对象
   */
  lastWeek: () => ({
    start: dayjs().subtract(1, 'week').startOf('week'),
    end: dayjs().subtract(1, 'week').endOf('week'),
  }),

  /**
   * 获取本月开始和结束
   * @returns 包含 start 和 end 的对象
   */
  thisMonth: () => ({
    start: dayjs().startOf('month'),
    end: dayjs().endOf('month'),
  }),

  /**
   * 获取上月开始和结束
   * @returns 包含 start 和 end 的对象
   */
  lastMonth: () => ({
    start: dayjs().subtract(1, 'month').startOf('month'),
    end: dayjs().subtract(1, 'month').endOf('month'),
  }),

  /**
   * 获取今年开始和结束
   * @returns 包含 start 和 end 的对象
   */
  thisYear: () => ({
    start: dayjs().startOf('year'),
    end: dayjs().endOf('year'),
  }),

  /**
   * 获取距今 N 天的日期范围
   * @param days - 天数
   * @returns 包含 start 和 end 的对象
   */
  getDateRange: (days: number) => ({
    start: dayjs().subtract(days, 'day').startOf('day'),
    end: dayjs().endOf('day'),
  }),

  /**
   * 获取最近 N 天
   * @param days - 天数
   * @returns 包含 start 和 end 的对象
   */
  getRecentDays: (days: number) => ({
    start: dayjs().subtract(days - 1, 'day').startOf('day'),
    end: dayjs().endOf('day'),
  }),

  /**
   * 判断是否同一天
   * @param date1 - 第一个日期
   * @param date2 - 第二个日期
   * @returns 是否同一天
   */
  isSameDay: (date1: Dayjs | string, date2: Dayjs | string): boolean => {
    return dayjs(date1).isSame(dayjs(date2), 'day');
  },

  /**
   * 判断是否同一月
   * @param date1 - 第一个日期
   * @param date2 - 第二个日期
   * @returns 是否同一月
   */
  isSameMonth: (date1: Dayjs | string, date2: Dayjs | string): boolean => {
    return dayjs(date1).isSame(dayjs(date2), 'month');
  },

  /**
   * 计算日期差
   * @param date1 - 第一个日期
   * @param date2 - 第二个日期
   * @param unit - 单位: 'day' | 'month' | 'year'
   * @returns 日期差
   */
  diff: (date1: Dayjs | string, date2: Dayjs | string, unit: 'day' | 'month' | 'year' = 'day'): number => {
    return dayjs(date1).diff(dayjs(date2), unit);
  },

  /**
   * 获取相对时间
   * @param date - 日期
   * @returns 相对时间字符串，如 '2小时前'
   */
  fromNow: (date: Dayjs | string): string => {
    return dayjs(date).fromNow();
  },

  /**
   * 解析日期
   * @param date - 日期字符串
   * @param format - 格式
   * @returns Dayjs 对象
   */
  parse: (date: string, format?: string): Dayjs => {
    return format ? dayjs(date, format) : dayjs(date);
  },

  /**
   * 判断日期是否有效
   * @param date - 日期
   * @returns 是否有效
   */
  isValid: (date: Dayjs | string | null | undefined): boolean => {
    if (!date) return false;
    return dayjs(date).isValid();
  },

  /**
   * 获取 Unix 时间戳（秒）
   * @param date - 日期
   * @returns Unix 时间戳
   */
  unix: (date?: Dayjs | string): number => {
    return dayjs(date).unix();
  },

  /**
   * 从 Unix 时间戳创建日期
   * @param timestamp - Unix 时间戳（秒）
   * @returns Dayjs 对象
   */
  fromUnix: (timestamp: number): Dayjs => {
    return dayjs.unix(timestamp);
  },

  /**
   * 现在
   * @returns 当前 Dayjs 对象
   */
  now: () => dayjs(),

  /**
   * 默认导出 dayjs
   */
  dayjs,
};

export default dateUtil;

