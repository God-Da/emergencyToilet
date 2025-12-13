import React from "react";

const Business1 = () => {
  return (
    <div className="w-full flex flex-col font-sans min-h-screen bg-white">
      {/* 헤더 섹션 */}
      <div className="bg-orange-50 py-16 border-b border-orange-100">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              공중화장실 원격관리시스템
            </h1>
            <p className="text-xl text-gray-600">
              PTRMS: Public Toilet Remote Management System
            </p>
            <p className="text-lg text-gray-500 mt-2">
              대한민국의 공중화장실을 세계적인 명품으로 만들어갑니다.
            </p>
          </div>
        </div>
      </div>

      {/* 주요기능 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">주요기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 기능 카드 1 */}
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4 text-center">📡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">원격 모니터링</h3>
              <p className="text-gray-600 text-center">
                실시간으로 화장실 상태를 모니터링하여 효율적인 관리가 가능합니다.
              </p>
            </div>

            {/* 기능 카드 2 */}
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4 text-center">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">안전 관리</h3>
              <p className="text-gray-600 text-center">
                화장실 관련 범죄 및 사고를 사전에 예방하여 안전한 환경을 제공합니다.
              </p>
            </div>

            {/* 기능 카드 3 */}
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4 text-center">🧹</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">위생 관리</h3>
              <p className="text-gray-600 text-center">
                청결하고 위생적인 공중화장실 서비스를 제공하여 국민건강을 보호합니다.
              </p>
            </div>

            {/* 기능 카드 4 */}
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4 text-center">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">에너지 절약</h3>
              <p className="text-gray-600 text-center">
                효율적인 자원관리를 통한 에너지 절약으로 환경보호에 기여합니다.
              </p>
            </div>

            {/* 기능 카드 5 */}
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4 text-center">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">데이터 분석</h3>
              <p className="text-gray-600 text-center">
                이용 패턴 및 관리 데이터를 분석하여 개선 방안을 도출합니다.
              </p>
            </div>

            {/* 기능 카드 6 */}
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4 text-center">🔔</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">알림 시스템</h3>
              <p className="text-gray-600 text-center">
                이상 상황 발생 시 즉시 알림을 전송하여 신속한 대응이 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 목표시스템 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">목표시스템</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🏢</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  통합 스마트 화장실 시스템 구축
                </h3>
                <p className="text-xl text-gray-600 font-semibold">
                  PTRMS (Public Toilet Remote Management System)
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-bold text-gray-800 mb-2">시스템 통합</h4>
                  <p className="text-gray-600 text-sm">
                    다양한 화장실 관리 기능을 하나의 시스템으로 통합하여 효율성을 극대화합니다.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-bold text-gray-800 mb-2">스마트 기술</h4>
                  <p className="text-gray-600 text-sm">
                    IoT, 빅데이터, AI 등 최신 기술을 활용한 지능형 화장실 관리 시스템입니다.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-bold text-gray-800 mb-2">원격 제어</h4>
                  <p className="text-gray-600 text-sm">
                    언제 어디서나 화장실 상태를 확인하고 관리할 수 있는 원격 제어 기능을 제공합니다.
                  </p>
                </div>
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                  <h4 className="font-bold text-gray-800 mb-2">실시간 모니터링</h4>
                  <p className="text-gray-600 text-sm">
                    화장실의 모든 상태를 실시간으로 모니터링하여 즉각적인 대응이 가능합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 기대효과 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">기대효과</h2>
          <div className="max-w-5xl mx-auto">
            <div className="space-y-6">
              {/* 기대효과 1 */}
              <div className="flex items-start gap-6 bg-orange-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  01
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    화장실 관리-IT기술 융합으로 신개념의 화장실 유지·관리 솔루션 제공
                  </h3>
                  <p className="text-gray-600">
                    최소의 비용으로 최대의 효과를 창출하는 효율적인 관리 시스템을 구축합니다.
                  </p>
                </div>
              </div>

              {/* 기대효과 2 */}
              <div className="flex items-start gap-6 bg-orange-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  02
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    화장실 관련 범죄 및 사고를 사전에 예방하여 안전한 화장실문화 조성
                  </h3>
                  <p className="text-gray-600">
                    실시간 모니터링과 즉각적인 대응 시스템으로 안전한 화장실 환경을 제공합니다.
                  </p>
                </div>
              </div>

              {/* 기대효과 3 */}
              <div className="flex items-start gap-6 bg-orange-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  03
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    청결하고 위생적인 공중화장실 서비스 제공으로 국민건강 보호
                  </h3>
                  <p className="text-gray-600">
                    체계적인 위생 관리 시스템으로 깨끗하고 안전한 화장실을 제공합니다.
                  </p>
                </div>
              </div>

              {/* 기대효과 4 */}
              <div className="flex items-start gap-6 bg-orange-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  04
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    보다 나은 시설 관리 및 보급을 통한 이용편의 도모
                  </h3>
                  <p className="text-gray-600">
                    효율적인 시설 관리로 이용자 편의성을 향상시키고 서비스 품질을 개선합니다.
                  </p>
                </div>
              </div>

              {/* 기대효과 5 */}
              <div className="flex items-start gap-6 bg-orange-50 rounded-2xl p-8 border border-orange-100 hover:shadow-lg transition-shadow">
                <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  05
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    효율적인 자원관리를 통한 에너지 절약 실천
                  </h3>
                  <p className="text-gray-600">
                    스마트한 자원 관리로 에너지 소비를 최적화하고 환경 보호에 기여합니다.
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

export default Business1;

