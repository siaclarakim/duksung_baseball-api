# 인터넷 기초[04] 과제2 - 나만의 인공지능 서비스 백엔드
# duksung_baseball-api

이 저장소는 **KBO 구단 추천 인공지능 서비스**의 백엔드 역할을 합니다.  
Google Gemini API를 호출하여, 사용자 정보 기반으로 어울리는 KBO 구단을 분석/추천합니다.

## 기능 설명

- 클라이언트로부터 받은 사용자 정보 (`name`, `cheer`, `local`)를 기반으로 프롬프트를 구성
- Google Gemini API를 사용해 응답 생성


## 주요 파일

- `api/duksungAI.js`  
  → POST 요청을 받아 Gemini API에 연결하고, 추천 결과를 생성
