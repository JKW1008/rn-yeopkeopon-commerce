import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_ID_KEY = "device_user_id";

let _cachedUserId: string | null = null;

/** RFC4122 v4 UUID 생성 (expo-crypto 없이 동작) */
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 기기 고유 UUID를 반환합니다.
 * 최초 호출 시 생성해서 AsyncStorage에 저장하고, 이후에는 캐시를 반환합니다.
 * 로그인 없이 cart, wishlist, address, order를 기기에 귀속시키기 위해 사용합니다.
 */
export async function getDeviceUserId(): Promise<string> {
  if (_cachedUserId) return _cachedUserId;

  const stored = await AsyncStorage.getItem(USER_ID_KEY);
  if (stored) {
    _cachedUserId = stored;
    return stored;
  }

  const newId = generateUUID();
  await AsyncStorage.setItem(USER_ID_KEY, newId);
  _cachedUserId = newId;
  return newId;
}
