import React from "react";

const Business2 = () => {
  return (
    <div className="w-full flex flex-col font-sans min-h-screen bg-white">
      {/* 헤더 섹션 */}
      <div className="bg-orange-50 py-16 border-b border-orange-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              전국공중화장실 실태조사
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
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">소개</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                전국 공중화장실 관리실태 조사와 비교평가를 통해 공중화장실 미비점 개선 및 선진화장실문화 정착과 기본정책 자료로 활용하고자, 매년 행정안전부와 협회가 공동으로 실시하고 있는 사업입니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                또한 이용자 만족도 및 선호도 조사를 통해 이용자편의 향상을 도모하고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 조사 내용 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">주요 조사 내용</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Key findings</p>

          {/* 시설현황 조사 */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-800">시설현황 조사</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-bold text-gray-800 mb-2">시설 위치 및 분포</h4>
                  <p className="text-gray-600 text-sm">
                    전국 공중화장실의 위치, 분포 현황 및 접근성을 조사합니다.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-bold text-gray-800 mb-2">시설 규모 및 구조</h4>
                  <p className="text-gray-600 text-sm">
                    화장실의 규모, 구조, 편의시설 설치 현황을 파악합니다.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-bold text-gray-800 mb-2">시설물 설치 현황</h4>
                  <p className="text-gray-600 text-sm">
                    각종 시설물의 설치 여부 및 상태를 점검합니다.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-bold text-gray-800 mb-2">관리 주체 및 체계</h4>
                  <p className="text-gray-600 text-sm">
                    화장실 관리 주체와 관리 체계를 조사합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 위생실태 조사 */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-800">위생실태 조사</h3>
              </div>
              <div className="space-y-6">
                {/* 위생실태 항목 1 */}
                <div className="flex items-start gap-6 bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    01
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">청결상태</h4>
                    <p className="text-gray-600">
                      화장실 내부의 청결도, 냄새, 쓰레기 처리 상태 등을 종합적으로 평가합니다.
                    </p>
                  </div>
                </div>

                {/* 위생실태 항목 2 */}
                <div className="flex items-start gap-6 bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    02
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">시설물의 파손 및 작동여부</h4>
                    <p className="text-gray-600">
                      변기, 세면대, 손건조기 등 각종 시설물의 파손 여부 및 정상 작동 여부를 점검합니다.
                    </p>
                  </div>
                </div>

                {/* 위생실태 항목 3 */}
                <div className="flex items-start gap-6 bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    03
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-800 mb-2">이용편의 고려 여부</h4>
                    <p className="text-gray-600">
                      장애인 편의시설, 유아용 시설, 여성 편의시설 등의 설치 및 운영 상태를 확인합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 이용자만족도 조사 */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-800">이용자만족도 조사</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-bold text-gray-800 mb-2">1. 이용현황</h4>
                  <p className="text-gray-600 text-sm">
                    유형, 빈도, 이용시간 등 화장실 이용 패턴을 조사합니다.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-bold text-gray-800 mb-2">2. 만족도 측정</h4>
                  <p className="text-gray-600 text-sm">
                    만족점수, 만족내용, 불편내용 등을 종합적으로 평가합니다.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-bold text-gray-800 mb-2">3. 이용안전</h4>
                  <p className="text-gray-600 text-sm">
                    범죄예방, 안전조치 등 이용자의 안전에 대한 인식을 조사합니다.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-bold text-gray-800 mb-2">4. 인구통계학적 특성 및 제언</h4>
                  <p className="text-gray-600 text-sm">
                    이용자의 특성과 개선사항에 대한 의견을 수집합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 경과보고 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">경과보고</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-100 shadow-lg">
              <div className="space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <span className="font-bold text-orange-600">2011년부터 2019년까지</span> 210개 시·군·구의 750개 공중화장실에 대해 관리실태 및 시설점검 그리고 이용자만족도를 조사하였습니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white rounded-xl p-6 text-center border border-orange-100">
                    <div className="text-3xl font-bold text-orange-600 mb-2">210</div>
                    <div className="text-sm text-gray-600">시·군·구</div>
                    <div className="text-xs text-gray-500 mt-1">전체의 85.7%</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center border border-orange-100">
                    <div className="text-3xl font-bold text-orange-600 mb-2">750</div>
                    <div className="text-sm text-gray-600">공중화장실</div>
                    <div className="text-xs text-gray-500 mt-1">조사 대상</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center border border-orange-100">
                    <div className="text-3xl font-bold text-orange-600 mb-2">58,000</div>
                    <div className="text-sm text-gray-600">전국 공중화장실</div>
                    <div className="text-xs text-gray-500 mt-1">약 1.36% 조사</div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-orange-200">
                  <p className="text-gray-600 text-sm">
                    이러한 조사를 통해 공중화장실의 현황을 파악하고, 개선 방안을 도출하여 선진화장실문화 정착에 기여하고 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Business2;

