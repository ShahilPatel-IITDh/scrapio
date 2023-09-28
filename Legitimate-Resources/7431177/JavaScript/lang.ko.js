/**
 * Created by quvsoftware on 2019-09-02.
 */

lang = {
    notice: '공지',
    subject: '제목',
    contents: '내용',
    attachment: '첨부파일',
    modify: '수정',
    remove: '삭제',
    writer: '작성자',
    hits : '추천수',
    views: '조회수',
    list: '목록',
    reply: '답글',
    recommend: '추천',
    comments: '댓글',
    write_comment: '댓글쓰기',
    secret_article: '비밀글',
    new_response: '새 응답',
    confirm: '확인',
    agree: '동의',
    account: '아이디 (이메일)',
    email: '이메일',
    prev_article: '이전글',
    next_article: '다음글',
    date_created: '작성일',
    state: '상태',
    all: '전체',
    view_all: '전체보기',
    close: '닫기',

    search_address: '우편번호 검색',
    file_upload: '파일 업로드',
    add_schedule: '일정 추가하기',
    modify_schedule: '일정 수정하기',
    edit: '수정하기',

    representative_image: '대표 이미지',

    password: '비밀번호',

    upload_size_limit_file: function (size){
        return '첨부 파일 크기는 ' + size + 'MB 이내로 가능합니다.';
    },
    upload_size_limit_image: '이미지 파일 크기는 10MB 이내로 가능합니다.',
    upload_overflow_file: '사이트가 허용된 용량을 넘어 파일을 저장할 수 없습니다.\n관리자에게 문의하세요.',
    upload_overflow_image: '사이트가 허용된 용량을 넘어 이미지를 저장할 수 없습니다.\n관리자에게 문의하세요.',
    upload_expired: '글쓰기 페이지의 세션이 만료되었습니다. 새로고침 후 작성해 주세요.',
    upload_error: function(size){
        return '업로드 중 문제가 발생했습니다.\n지원되는 형식이 아니거나 업로드가 불가능한 파일입니다.\n [파일용량 제한 : ~' + size + 'MB]\n [지원되는 형식 : jpg, jpeg, png]';
    },
    upload_file_limit: '파일은 최대 5개까지 업로드 할 수 있습니다.',

    remove_attachment: '해당 첨부파일을 삭제하시겠습니까?',
    remove_complete: '삭제 되었습니다.',
    remove_article: '해당 게시글을 삭제하시겠습니까?',
    remove_article_complete: '게시글이 삭제 되었습니다.',
    remove_article_error_1351: '이 글과 관련된 답변 혹은 댓글이 존재하므로 삭제 할 수 없습니다.\n\n우선 답변과 댓글부터 삭제해주세요.',
    remove_article_error_1351_nomember: '답글이 달린 게시글은 삭제할 수 없습니다.',
    remove_comment: '해당 댓글을 삭제하시겠습니까?',
    remove_comment_error_1351: '해당 댓글이 존재하지 않습니다.',
    remove_comment_error_1352: '이 글과 관련된 댓글이 존재하므로 삭제 할 수 없습니다.\n\n우선 댓글부터 삭제해주세요.',
    remove_comment_error_1352_nomember: '답글이 달린 글은 삭제할 수 없습니다.',
    remove_schedule: '선택한 일정을 삭제하시겠습니까?',

    login_error_1355: 'ID 또는 비밀번호가 올바르지 않습니다. \n다시 입력해 주세요.',
    login_error_1356: '승인 대기 중인 회원입니다. \n관리자 승인 후 로그인이 가능합니다.',
    login_error_1357: '중지 중인 회원입니다. \n관리자에 문의하세요.',
    login_error_1358: '비밀번호가 일치하지 않습니다.',
    login_error_1359: '존재하는 회원 ID가 없습니다.',
    login_error_1360: '해당 계정이 존재하지 않습니다.',

    sns_login_error_1350: '탈퇴한 사용자 입니다.\n\n탈퇴 시점으로 7일 뒤 재가입이 가능합니다.',
    sns_login_error_1351: function(sc_type){
        return '해당 이메일이 이미 ' + sc_type + ' 계정으로 등록되어 있습니다.\n\n' + sc_type + ' 계정으로 로그인 해주세요.';
    },

    enter_subject: '제목을 입력해 주세요.',
    enter_contents: '내용을 입력해 주세요.',
    enter_writer: '작성자를 입력해 주세요.',
    enter_password: '비밀번호를 입력해 주세요.',
    enter_account: 'ID(계정)를 입력해 주세요.',
    enter_schedule_subject: '일정 제목을 기입해주세요.',


    complete_modify: '수정 되었습니다.',
    complete_change: '변경 되었습니다.',
    complete_regist: '등록 되었습니다.',
    complete_login: '로그인 하였습니다.',
    complete_join: '회원정보가 등록 되었습니다.\n\n첫 화면에서 다시 로그인 해주세요.',
    no_more_reply: '더 이상 답변하실 수 없습니다.',

    agree_term_privacy_info: '이용약관 및 개인 정보 수집/이용에 동의해주세요.',
    agree_privacy_info: '개인정보 수집 및 이용에 동의해주세요.',
    agree_privacy_info_blank_1: '<a href="/policy_privacy" target="_blank">개인정보 수집 및 이용</a>에 동의합니다.',
    agree_privacy_info_blank_2: '<a href="/policy_privacy" target="_blank" rel="noopener noreferrer">개인정보 수집 및 이용</a> 동의',
    terms_of_service: '이용약관(Terms of service)',
    privacy_policy: '개인정보취급방침(Privacy Policy)',


    not_complete_board_creation: '게시판 생성이 완료되지 않았습니다.\n사이트 관리자에게 문의해주세요.',
    not_complete_board_configration: '게시판 설정이 완료되지 않았습니다.\n사이트 관리자에게 문의해주세요.',
    not_complete_form_creation: '폼 생성이 완료되지 않았습니다.\n사이트 관리자에게 문의해주세요.',
    not_complete_kakao_plus: '카카오 플러스친구 1:1 채팅 설정이 완료되지 않았습니다.\n\n[대시보드] - [환경] > [소셜 연동]에서 설정을 완료해주세요.',
    not_complete_receive_email: '웹사이트 수신 메일 설정이 되어 있지 않습니다.\n사이트 관리자에게 문의해주세요.',

    complete_creation: '작성이 완료되었습니다.',
    complete_withdrawal: '탈퇴 완료되었습니다.',
    withdrawal: '탈퇴 하시겠습니까?',

    not_exist_form: '존재하지 않는 폼 입니다.\n사이트 관리자에게 문의해주세요.',
    try_again_after_login: '회원이시면 로그인 후 이용해주세요.',
    find_next: '다음 찾기',
    is_secret_article: '비밀글입니다.',
    no_posts: '게시글이 없습니다.',
    no_member_info: '회원 정보가 없습니다.',
    recommended_posts: '게시글을 추천 하였습니다.',
    login_to_make_recommend: '추천을 하려면 로그인 해주세요.',
    already_recommended: '이미 추천한 게시입니다.',
    no_result_found: '검색 결과가 없습니다.',

    success_send_guide_mail: '안내 메일이 발송되었습니다.',
    success_send_sms: '메세지가 발송되었습니다.',
    failure_send_guide_mail: '메일 발송이 실패했습니다.\n\n관리자에게 문의해주세요.',
    failure_send_sms_frequently_called: '메세지를 연속해서 보낼 수 없습니다.\n\n잠시 후 다시 시도해주세요.',
    failure_send_sms_too_long_message: '메세지가 너무 깁니다.\n\n내용을 수정 후 다시 시도해주세요.',
    failure_send_sms_low_balance: 'SMS 잔량이 모두 소진되었습니다.\n\n관리자에게 문의해주세요.',
    failure_send_sms_invalid_number: '연락처 형식이 잘못되었습니다.\n\n확인 후 올바른 연락처를 기입해주세요.',
    failure_send_sms_default: '메세지 발송에 실패하였습니다.\n잠시 후 다시 시도해주세요.\n\n문제가 지속되면 관리자에게 문의해주세요.',


    no_permission: '권한이 없습니다. 로그인 후 이용해주세요.',
    no_permission_contact_administrator: '권한이 없습니다.\n관리자에게 문의해주세요.',
    no_permission_please_login_1: '권한이 없습니다.\n글을 작성하려면 로그인 해주세요.',
    no_permission_please_login_2: '권한이 없습니다. 회원이시면 로그인 후 이용해주세요',
    required_input_element: '필수 입력요소입니다.',
    invalid_format: '잘못된 형식입니다.',
    invalid_access: '잘못된 접근입니다.',
    invalid_mobile_number: '연락처 형식이 잘못되었습니다.\n\n확인 후 올바른 연락처를 기입해주세요.',
    invalid_password: '비밀번호가 올바르지 않습니다.',
    invalid_password_limit: '비밀번호는 최대 20자 까지 가능합니다.',
    expired_certification: '인증 만료되었습니다.',
    already_change_password: '이미 비밀번호를 변경 하였습니다.',
    already_signed_up_account: '이미 가입된 계정입니다.',
    different_password: '비밀번호가 다릅니다.',

    requires_login: '로그인이 필요한 페이지입니다.',

    only_administrator_create_it: '관리자만 작성할 수 있습니다.',


    problem_1: '문제가 발생했습니다.',
    problem_2: '작성 중 오류가 발생했습니다.',
    problem_term: '약관 정보를 가져오는 중 문제가 발생했습니다.',

    blocked_popup: '이 페이지에서 팝업이 차단되었습니다.\n\n팝업을 허용해주세요.',

    today_close: '오늘 하루 열지 않음',

    add_schedule: '일정 추가하기',
    modify_schedule: '일정 수정하기',
}