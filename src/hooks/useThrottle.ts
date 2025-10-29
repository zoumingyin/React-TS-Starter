import { useCallback, useEffect, useRef, useState } from "react";

// 节流Hook - 限制执行频率
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const callbackRef = useRef<T>(callback);
  const lastCallTime = useRef<number>(0);
  const timerRef = useRef<number>();

  // 更新回调函数引用
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const throttledCallback = useCallback(
    ((...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastCallTime.current >= delay) {
        // 立即执行
        lastCallTime.current = now;
        callbackRef.current(...args);
      } else {
        // 清除之前的延迟执行
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        // 设置延迟执行
        timerRef.current = setTimeout(() => {
          lastCallTime.current = Date.now();
          callbackRef.current(...args);
        }, delay - (now - lastCallTime.current));
      }
    }) as T,
    [delay]
  );

  return throttledCallback;
};

// 节流值Hook - 限制值更新频率
export const useThrottleValue = <T>(value: T, delay: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdateTime = useRef<number>(0);
  const timerRef = useRef<number>();

  useEffect(() => {
    const now = Date.now();

    if (now - lastUpdateTime.current >= delay) {
      // 立即更新
      lastUpdateTime.current = now;
      setThrottledValue(value);
    } else {
      // 清除之前的延迟更新
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // 设置延迟更新
      timerRef.current = setTimeout(() => {
        lastUpdateTime.current = Date.now();
        setThrottledValue(value);
      }, delay - (now - lastUpdateTime.current));
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return throttledValue;
};
