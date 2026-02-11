import { 
    randomBytes, 
    createCipheriv, // 우리 서비스 oauth 인증 후 사용자 정보 가져오는 과정에서 사용 되지 않기 때문에 일단 보류 
    createDecipheriv 
} from 'crypto'; 

export class SecurityService{
    generateSessionKey(): string {
        const buffer = randomBytes(32);
        const sessionKey = buffer.toString('base64');
        return sessionKey
    }

    decryptPersonal(encryptedData: string, sessionKey: string, iv: string): string{
        const key = Buffer.from(sessionKey, 'base64'); // sessionKey라는 변수가 Base64로 저장되어 있음을 의미 -> 저장은 Buffer에 Binary data로 저장하게 함
        const ivBuffer = Buffer.from(iv, 'base64'); 
        
        const decipher = createDecipheriv("aes-256-cbc", key, ivBuffer) // 'aes-256-cbc' : 어떠한 방식으로 암호를 풀 것인가, 여기서 key = SessionKey, iv는 salt로 동일한 키를 쓰더라도 암호문이 매번 다르게 보이도록 하는 역할
        const result = Buffer.concat([
            decipher.update(encryptedData, 'base64'), // 암호화 된 이진 데이터가 Base64로 저장되어 있어서 Buffer에 저장하기 위해서 base64로 인코딩 된 것을 디코딩 해야 한다는 의미
            decipher.final() // 만약 다루는 데이터가 35바이트 인 경우 -> 16바이트 씩 2번 => 3바이트 남음, 3바이트는 16바이트가 되지 못하기 때문에 남아있음 이를 패딩을 합쳐서 결과를 보여줌
        ])
        return result.toString('utf8');
    }
}