import React from "react";

const Business3 = () => {
  return (
    <div className="w-full flex flex-col font-sans min-h-screen bg-white">
      {/* 헤더 섹션 */}
      <div className="bg-orange-50 py-16 border-b border-orange-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              사랑의화장실 지어주기
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              대한민국의 공중화장실을 세계적인 명품으로 만들어갑니다.
            </p>
          </div>
        </div>
      </div>

      {/* 소개 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">사업소개</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                우리 주변을 둘러보면 아직까지도 더럽고 불결한 화장실을 그대로 사용하거나 이마저도 없어 불편한 생활을 하는 이웃들이 너무나도 많이 있습니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                비위생적인 화장실 사용으로 인해 자칫 각종 세균 감염 및 질병발생을 일으킬 수 있으며, 심할 경우 생명까지도 위협할 수 있습니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                사랑의화장실 지어주기 사업을 통해 그들이 깨끗한 화장실문화 혜택을 받을 수 있도록 노력하고 있습니다.
              </p>
              <div className="mt-6 p-4 bg-orange-100 rounded-xl text-center">
                <p className="text-xl font-bold text-orange-800">
                  여러분의 사랑이 화장실이 없는 어려운 이웃에게 희망과 기쁨을 줍니다!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 사업후원 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">사업후원</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Love Toilet</p>

          {/* 무엇을 후원할 수 있나요? */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              무엇을 후원할 수 있나요?
            </h3>
            <div className="space-y-6">
              {/* 후원 항목 1 */}
              <div className="flex items-start gap-6 bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  01
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">기금후원</h4>
                  <p className="text-gray-600 mb-2">
                    후원액수는 제한은 없으며, 후원자가 원하는 금액을 납부하시면 됩니다.
                  </p>
                  <p className="text-gray-600">
                    기부액이 500만원 이상일 경우, 기부자가 우선적으로 지원을 원하는 지역을 선택할 수 있으며 단독명의로 기부가 가능합니다.
                  </p>
                </div>
              </div>

              {/* 후원 항목 2 */}
              <div className="flex items-start gap-6 bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  02
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    화장실 관련제품 및 공사 관련 장비 지원
                  </h4>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">주요 화장실 품목:</span> 변기, 세면대 등 위생도구, 수전금구, 타일, 욕조, 비데, 욕실기구 소모성 위생용품, 공사에 필요한 자재 일체
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">공사 관련 장비:</span> 트럭, 지게차, 화장실 운반 트레일러 등 공사 관련 장비 일체
                    </p>
                  </div>
                </div>
              </div>

              {/* 후원 항목 3 */}
              <div className="flex items-start gap-6 bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  03
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">인력지원</h4>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">지식기부:</span> 화장실 설계·설비·전기·미장·도배전문가
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">단순노동인력:</span> 청소
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 후원방법 */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              후원방법은 어떻게 되나요?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 후원금액 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <div className="text-5xl mb-4 text-center">💰</div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">후원금액</h4>
                <p className="text-gray-600 mb-4 text-center">
                  후원자가 금액을 자유롭게 결정할 수 있어요
                </p>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <p className="text-sm text-gray-600 mb-2">무통장입금</p>
                  <p className="text-sm text-gray-600 mb-1">예금주: 급똥지도</p>
                  <p className="text-lg font-bold text-orange-600">우리은행 123-456789-10-123</p>
                </div>
              </div>

              {/* 후원문의 */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <div className="text-5xl mb-4 text-center">📞</div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">후원문의</h4>
                <p className="text-gray-600 mb-4 text-center">
                  후원자가 원하는 어떠한 방법으로도 사랑을 전할 수 있어요
                </p>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 text-center">
                  <p className="text-lg font-bold text-orange-600">후원문의 031-123-4567</p>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-100 text-center">
              <p className="text-gray-700">
                후원 신청서를 작성하시어 우편, 팩스 또는 이메일 (emergencytoilet@naver.com)로 보내주시면 후원신청이 자동 접수 됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 사업실적 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">사업실적</h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <p className="text-center text-gray-600 mb-8">
                사랑의화장실 지어주기 사업을 통해 많은 이웃들에게 깨끗한 화장실을 제공하고 있습니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 실적 카드 1 */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className="text-4xl mb-4">🏗️</div>
                  <h4 className="font-bold text-gray-800 mb-2">공사전</h4>
                  <p className="text-sm text-gray-600">
                    화장실이 없거나 낡은 상태의 집을 확인하고 사업을 시작합니다.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className="text-4xl mb-4">🔨</div>
                  <h4 className="font-bold text-gray-800 mb-2">공사중</h4>
                  <p className="text-sm text-gray-600">
                    전문가와 자원봉사자들이 함께 화장실을 건설합니다.
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
                  <div className="text-4xl mb-4">✨</div>
                  <h4 className="font-bold text-gray-800 mb-2">공사후</h4>
                  <p className="text-sm text-gray-600">
                    깨끗하고 안전한 화장실이 완성되어 이웃들에게 전달됩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 경과보고 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">경과보고</h2>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 shadow-lg">
              <div className="text-center mb-8">
                <p className="text-xl text-gray-700 mb-2">
                  <span className="font-bold text-orange-600">2010년부터 2018년까지</span>
                </p>
                <p className="text-2xl font-bold text-orange-600 mb-2">
                  531,765,000원
                </p>
                <p className="text-lg text-gray-700">
                  을 들여, 총 <span className="font-bold text-orange-600">71개 가정</span>의 화장실을 무료로 지어주거나 수리해주었습니다.
                </p>
              </div>

              {/* 연도별 실적 */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-8">
                <div className="bg-white rounded-xl p-4 text-center border border-orange-100">
                  <div className="text-sm font-bold text-gray-600 mb-2">2010년</div>
                  <div className="text-lg font-bold text-orange-600">47,000천원</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-orange-100">
                  <div className="text-sm font-bold text-gray-600 mb-2">2011년</div>
                  <div className="text-lg font-bold text-orange-600">78,750천원</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-orange-100">
                  <div className="text-sm font-bold text-gray-600 mb-2">2012년</div>
                  <div className="text-lg font-bold text-orange-600">98,015천원</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-orange-100">
                  <div className="text-sm font-bold text-gray-600 mb-2">2013년</div>
                  <div className="text-lg font-bold text-orange-600">84,000천원</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-orange-100">
                  <div className="text-sm font-bold text-gray-600 mb-2">2014년</div>
                  <div className="text-lg font-bold text-orange-600">105,000천원</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-orange-100">
                  <div className="text-sm font-bold text-gray-600 mb-2">2015년</div>
                  <div className="text-lg font-bold text-orange-600">36,000천원</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-orange-100">
                  <div className="text-sm font-bold text-gray-600 mb-2">2016년</div>
                  <div className="text-lg font-bold text-orange-600">48,000천원</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-orange-100">
                  <div className="text-sm font-bold text-gray-600 mb-2">2017~19년</div>
                  <div className="text-lg font-bold text-orange-600">60,000천원</div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-orange-200 text-center">
                <p className="text-gray-600 text-sm">
                  이러한 후원을 통해 어려운 이웃들에게 깨끗하고 안전한 화장실을 제공하여 건강한 생활 환경을 만들어가고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default Business3;

