/**
 * OpenDART 공시목록 조회 요청 파라미터
 * @property (필수) crtfc_key API 인증키 (필수, 40자리)
 * @property corp_code 공시대상회사의 고유번호(8자리, 선택)
 * @property bgn_de 검색시작 접수일자(YYYYMMDD, 선택)
 * @property end_de 검색종료 접수일자(YYYYMMDD, 선택)
 * @property last_reprt_at 최종보고서만 검색여부(Y or N, 기본값: N, 선택)
 * @property pblntf_ty 공시유형(A~J, 선택)
 * @property pblntf_detail_ty 공시상세유형(선택)
 * @property corp_cls 법인구분(Y:유가, K:코스닥, N:코넥스, E:기타, 선택)
 * @property sort 정렬(date:접수일자, crp:회사명, rpt:보고서명, 선택)
 * @property sort_mth 정렬방법(asc:오름차순, desc:내림차순, 선택)
 * @property page_no 페이지 번호(기본값: 1, 선택)
 * @property page_count 페이지당 건수(1~100, 기본값: 10, 선택)
 */
export type SeasonalDisclosure = {
  /** API 인증키(40자리) */
  crtfc_key: string;
  /** 공시대상회사의 고유번호(8자리) */
  corp_code?: string;
  /** 검색시작 접수일자(YYYYMMDD) */
  bgn_de?: string;
  /** 검색종료 접수일자(YYYYMMDD) */
  end_de?: string;
  /** 최종보고서만 검색여부(Y or N, 기본값: N) */
  last_reprt_at?: string;
  /** 공시유형(A~J) */
  pblntf_ty?: string;
  /** 공시상세유형 */
  pblntf_detail_ty?: string;
  /** 법인구분(Y:유가, K:코스닥, N:코넥스, E:기타) */
  corp_cls?: string;
  /** 정렬(date:접수일자, crp:회사명, rpt:보고서명) */
  sort?: string;
  /** 정렬방법(asc:오름차순, desc:내림차순) */
  sort_mth?: string;
  /** 페이지 번호(기본값: 1) */
  page_no?: string;
  /** 페이지당 건수(1~100, 기본값: 10) */
  page_count?: string;
};

/**
 * OpenDART 공시목록 조회 응답 타입
 * @property status 에러 및 정보 코드
 * @property message 에러 및 정보 메시지
 * @property page_no 페이지 번호
 * @property page_count 페이지당 건수
 * @property total_count 총 건수
 * @property total_page 총 페이지 수
 * @property list 공시 목록(SeasonalDisclosure[])
 */
export type SeasonalDisclosureResponse = {
  /** 에러 및 정보 코드 */
  status: string;
  /** 에러 및 정보 메시지 */
  message: string;
  /** 페이지 번호 */
  page_no: number;
  /** 페이지당 건수 */
  page_count: number;
  /** 총 건수 */
  total_count: number;
  /** 총 페이지 수 */
  total_page: number;
  /** 공시 목록 */
  list: SeasonalDisclosureItem[];
};

/**
 * OpenDART 공시목록 조회 응답 공시 목록 아이템
 * @property corp_cls 법인구분(Y:유가, K:코스닥, N:코넥스, E:기타)
 * @property corp_name 공시대상회사의 종목명(상장사) 또는 법인명(기타법인)
 * @property corp_code 공시대상회사의 고유번호(8자리)
 * @property stock_code 상장회사의 종목코드(6자리)
 * @property report_nm 공시구분+보고서명+기타정보
 *   [기재정정]: 본 보고서명으로 이미 제출된 보고서의 기재내용이 변경되어 제출된 것임
 *   [첨부정정]: 본 보고서명으로 이미 제출된 보고서의 첨부내용이 변경되어 제출된 것임
 *   [첨부추가]: 본 보고서명으로 이미 제출된 보고서의 첨부서류가 추가되어 제출된 것임
 *   [변경등록]: 본 보고서명으로 이미 제출된 보고서의 유동화계획이 변경되어 제출된 것임
 *   [연장결정]: 본 보고서명으로 이미 제출된 보고서의 신탁계약이 연장되어 제출된 것임
 *   [발행조건확정]: 본 보고서명으로 이미 제출된 보고서의 유가증권 발행조건이 확정되어 제출된 것임
 *   [정정명령부과]: 본 보고서에 대하여 금융감독원이 정정명령을 부과한 것임
 *   [정정제출요구]: 본 보고서에 대하여 금융감독원이 정정제출요구를 부과한 것임
 * @property rcept_no 접수번호(14자리)
 *    ※ 공시뷰어 연결에 이용예시
 *      - PC용 : https://dart.fss.or.kr/dsaf001/main.do?rcpNo=접수번호
 * @property flr_nm 공시 제출인명
 * @property rcept_dt 공시 접수일자(YYYYMMDD)
 * @property rm 비고
 *   - 유 : 본 공시사항은 한국거래소 유가증권시장본부 소관임
 *   - 코 : 본 공시사항은 한국거래소 코스닥시장본부 소관임
 *   - 채 : 본 문서는 한국거래소 채권상장법인 공시사항임
 *   - 넥 : 본 문서는 한국거래소 코넥스시장 소관임
 *   - 공 : 본 공시사항은 공정거래위원회 소관임
 *   - 연 : 본 보고서는 연결부분을 포함한 것임
 *   - 정 : 본 보고서 제출 후 정정신고가 있으니 관련 보고서를 참조하시기 바람
 *   - 철 : 본 보고서는 철회(간주)되었으니 관련 철회신고서(철회간주안내)를 참고하시기 바람
 */
export type SeasonalDisclosureItem = {
  /** 법인구분(Y:유가, K:코스닥, N:코넥스, E:기타) */
  corp_cls: string;
  /** 공시대상회사의 종목명(상장사) 또는 법인명(기타법인) */
  corp_name: string;
  /** 공시대상회사의 고유번호(8자리) */
  corp_code: string;
  /** 상장회사의 종목코드(6자리) */
  stock_code: string;
  /** 공시구분+보고서명+기타정보 */
  report_nm: string;
  /** 접수번호(14자리) */
  rcept_no: string;
  /** 공시 제출인명 */
  flr_nm: string;
  /** 공시 접수일자(YYYYMMDD) */
  rcept_dt: string;
  /** 조합된 문자로 각각은 아래와 같은 의미가 있음 */
  rm: string;
};

/**
 * OpenDART 공시문서 조회 요청 파라미터
 * @property crtfc_key API 인증키(40자리)
 * @property rcept_no 접수번호(14자리)
 */
export type DisclosureDocumentRequest = {
  /** API 인증키(40자리) */
  crtfc_key: string;
  /** 접수번호(14자리) */
  rcept_no: string;
};

export class DisclosureDocumentResponse {
  /** 에러 및 정보 코드 */
  status: string;
  /** 에러 및 정보 메시지(코드) */
  message: string;

  /**
   * message 코드에 따라 한글 메시지를 반환하는 getter
   */
  get readableMessage(): string {
    switch (this.message) {
      case '000':
        return '정상';
      case '010':
        return '등록되지 않은 키입니다.';
      case '011':
        return '사용할 수 없는 키입니다. 오픈API에 등록되었으나, 일시적으로 사용 중지된 키를 통하여 검색하는 경우 발생합니다.';
      case '012':
        return '접근할 수 없는 IP입니다.';
      case '013':
        return '조회된 데이터가 없습니다.';
      case '014':
        return '파일이 존재하지 않습니다.';
      case '020':
        return '요청 제한을 초과하였습니다. 일반적으로는 20,000건 이상의 요청에 대하여 이 에러 메시지가 발생되나, 요청 제한이 다르게 설정된 경우에는 이에 준하여 발생됩니다.';
      case '021':
        return '조회 가능한 회사 개수가 초과하였습니다.(최대 100건)';
      case '100':
        return '필드의 부적절한 값입니다. 필드 설명에 없는 값을 사용한 경우에 발생하는 메시지입니다.';
      case '101':
        return '부적절한 접근입니다.';
      case '800':
        return '시스템 점검으로 인한 서비스가 중지 중입니다.';
      case '900':
        return '정의되지 않은 오류가 발생하였습니다.';
      case '901':
        return '사용자 계정의 개인정보 보유기간이 만료되어 사용할 수 없는 키입니다. 관리자 이메일(opendart@fss.or.kr)로 문의하시기 바랍니다.';
      default:
        return '알 수 없는 오류입니다.';
    }
  }
}
