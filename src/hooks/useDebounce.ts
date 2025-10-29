import { useCallback, useEffect, useRef, useState } from "react";

// 防抖Hook - 延迟执行
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const callbackRef = useRef<T>(callback);
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

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      // 清除之前的定时器
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // 设置新的定时器
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    }) as T,
    [delay]
  );

  return debouncedCallback;
};

// 防抖值Hook - 延迟更新值
export const useDebounceValue = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
