import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'

type Phase = 'credentials' | 'twofa'

/* ── SVG Icon components (matching KSU EduGate) ─────────────────── */

function HomeIcon() {
  return (
    <svg width="22" height="20" viewBox="0 0 29 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.1243 0C14.2946 0.0588795 14.4249 0.105231 14.5652 0.229254C15.8806 1.37761 17.2545 2.5811 18.6868 3.8397C18.8004 3.55574 18.8417 3.16029 18.8108 2.65334C18.7975 2.43035 18.8772 2.20777 19.0501 1.98562L19.476 1.64236C19.6047 1.61814 19.7391 1.59518 19.8794 1.57346C20.0239 1.55175 20.163 1.54131 20.2966 1.54214C21.2211 1.55049 22.2321 1.54841 23.3295 1.53588C24.3205 1.52586 24.9719 1.87162 24.9681 2.93771C24.9631 5.04652 24.9623 7.16201 24.9656 9.28418C24.9656 9.31841 24.9729 9.35229 24.9869 9.3836C25.0009 9.4149 25.0214 9.44292 25.0471 9.46582C25.9123 10.235 26.7262 10.9512 27.4887 11.6143C27.6749 11.7772 27.8353 11.9379 27.9697 12.0966C28.0524 12.1935 28.095 12.3242 28.0975 12.4887C28.0992 12.629 28.0649 12.756 27.9948 12.8696C27.7818 13.2153 27.4557 13.3343 27.0164 13.2266L26.6268 12.8646C26.4948 12.69 26.3391 12.5597 26.1595 12.4737L25.1586 11.5955C25.1318 11.5454 25.088 11.5325 25.027 11.5567C25.0101 11.5632 24.9955 11.5748 24.9852 11.5897C24.9749 11.6047 24.9694 11.6224 24.9694 11.6406C24.951 14.5645 24.9523 17.5031 24.9731 20.4563C24.9782 21.2346 24.913 21.8502 24.7777 22.3028C24.4278 23.4696 23.6369 24.2955 22.405 24.7808C22.2071 24.8593 21.9636 24.9186 21.6746 24.9587C21.4859 24.9854 21.2378 24.9987 20.9305 24.9987C16.4907 24.9962 11.7503 24.9967 6.70921 25C6.26406 25 5.72371 24.8463 5.08814 24.539C4.31812 24.0613 3.76774 23.4449 3.43701 22.6899C3.40026 22.5337 3.35642 22.3851 3.30547 22.2439C3.25035 22.0919 3.21569 21.9437 3.20149 21.7992C3.1802 21.585 3.12507 21.3921 3.12507 21.1741C3.12173 17.9411 3.12173 14.7579 3.12507 11.6243C3.12498 11.6026 3.11799 11.5815 3.10514 11.5641C3.09228 11.5468 3.07424 11.534 3.05367 11.5279C3.01608 11.517 2.99228 11.5291 2.98226 11.5642L1.05677 13.1965C1.03876 13.2121 1.01668 13.2225 0.992884 13.2266C0.798289 13.2642 0.611211 13.2671 0.431649 13.2354L0.0483058 12.822C-0.0535851 12.528 0.00571205 12.2236 0.226197 11.9087C0.285494 11.8143 0.378198 11.725 0.504309 11.6406C0.65798 11.6381 0.764047 11.5441 0.822509 11.3587L1.6581 10.6259C1.95876 10.4597 2.21474 10.2379 2.42604 9.96066L2.6365 9.76523C2.7743 9.72264 2.87953 9.63119 2.95219 9.49088L3.11881 9.33429C3.39609 9.19398 3.6053 9.01066 3.74644 8.78433L4.67098 7.97755C4.833 7.9099 4.97372 7.79005 5.09315 7.61801L5.45144 7.28854C5.74208 7.12401 5.98721 6.91146 6.18681 6.65088L9.98642 3.27345C10.1484 3.23503 10.3004 3.10558 10.4424 2.8851L12.1512 1.36926C12.4518 1.22144 12.6974 1.00429 12.8878 0.717829L13.6207 0.116506L14.1243 0ZM13.9639 1.80773C13.6591 2.08667 13.381 2.31885 13.1296 2.50426C13.1204 2.51094 13.1112 2.52389 13.102 2.54309C13.0862 2.57817 13.0636 2.60866 13.0344 2.63455L4.70731 10.002C4.6739 10.0321 4.65302 10.0688 4.64467 10.1122C4.6121 10.291 4.59539 10.5052 4.59456 10.7549C4.59456 14.2292 4.59498 17.7035 4.59581 21.1778C4.59581 21.2622 4.60667 21.3449 4.62838 21.4259C4.69102 21.6526 4.7048 21.8719 4.80502 22.0898C5.0706 22.6653 5.50364 23.0741 6.10413 23.3163C6.3931 23.4332 6.80275 23.4883 7.33308 23.4817C8.18329 23.4708 9.02764 23.4641 9.86616 23.4616C9.96011 23.4616 10.0278 23.4391 10.1255 23.4416C10.1981 20.7607 10.2169 18.0869 10.1819 15.4202C10.1785 15.1629 10.3176 14.8514 10.599 14.4856C10.7276 14.3537 10.9055 14.2476 11.1327 14.1674C11.3206 14.1975 11.5048 14.1687 11.6852 14.081C13.6762 14.0584 15.2292 14.0605 16.3442 14.0872C17.0357 14.1039 17.5217 14.4142 17.8024 15.018C17.885 15.1959 17.8612 15.4152 17.8963 15.6093C17.9222 15.7522 17.9356 15.895 17.9364 16.0378C17.9506 18.4222 17.9489 20.8546 17.9314 23.3351C17.9312 23.3529 17.9346 23.3706 17.9414 23.3871C17.9481 23.4036 17.9581 23.4185 17.9707 23.4311C17.9833 23.4437 17.9982 23.4537 18.0147 23.4604C18.0312 23.4672 18.0489 23.4706 18.0667 23.4704C18.9987 23.4645 19.9295 23.4679 20.8591 23.4804C21.25 23.4854 21.5978 23.429 21.9026 23.3113C22.2676 23.1701 22.5833 22.9613 22.8497 22.6849C23.0861 22.502 23.2402 22.2485 23.312 21.9245C23.4139 21.6706 23.4652 21.5073 23.4661 21.4347C23.4928 19.984 23.4769 18.5349 23.4185 17.0876L23.4272 13.5999C23.4915 11.9413 23.5095 10.7996 23.4811 10.1749C23.4744 10.0446 23.3646 9.93477 23.1516 9.84541L22.6881 9.42198C22.5612 9.22655 22.3996 9.08248 22.2033 8.98978L21.9365 8.76679C21.6575 8.44358 21.3401 8.16881 20.9844 7.94247L20.4895 7.48271C20.4144 7.34992 20.3187 7.25763 20.2026 7.20585C20.1651 7.18998 20.1329 7.1666 20.1062 7.1357C20.0511 7.07557 19.9888 7.0359 19.9195 7.01669L19.6214 6.706C19.0175 6.098 18.3774 5.53969 17.7009 5.03107C17.6499 4.95507 17.5827 4.89535 17.4992 4.85192C17.272 4.56128 16.9948 4.31491 16.6674 4.1128C16.6306 4.06436 16.5922 4.02803 16.5521 4.00381C16.1846 3.58455 15.7696 3.22042 15.3069 2.9114C15.2334 2.82121 15.1661 2.76316 15.1052 2.73727L14.1543 1.83529C14.1226 1.80439 14.085 1.79186 14.0416 1.7977L13.9639 1.80773Z" />
    </svg>
  )
}

function ContactIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.0117512 22.0227C-0.00578245 15.7899 -0.00369496 11.8327 0.0180134 10.1511C0.0280327 9.37382 0.317756 8.66412 0.887184 8.02205C0.904717 8.01704 0.915154 8.00786 0.918494 7.9945L1.24412 7.70144C1.27057 7.67829 1.30125 7.66082 1.33429 7.65009C1.42697 7.62003 1.48876 7.55073 1.51965 7.44219L2.49903 6.73834C2.67938 6.67405 2.84511 6.58387 2.99624 6.46782C3.10812 6.38265 3.16281 6.28455 3.1603 6.1735C3.1436 5.46046 3.30683 4.83301 3.64999 4.29113C3.72013 4.18009 3.82283 4.05777 3.95809 3.92418C4.0683 3.8148 4.18143 3.70208 4.29749 3.58603L4.7208 3.35183L6.35394 3.12639C6.59607 3.12639 6.84321 3.12556 7.09537 3.12389C7.27237 3.12305 7.41765 3.08799 7.5312 3.01869C7.66062 2.9402 7.77876 2.84043 7.88563 2.71936C8.06181 2.68012 8.18538 2.59621 8.25635 2.46763C8.44588 2.27977 8.67215 2.12196 8.93515 1.99422C9.15641 1.91072 9.21026 1.85771 9.09671 1.83516L10.7774 0.611561C10.9378 0.559795 11.0597 0.473379 11.1431 0.352313C11.6679 -0.0522142 12.6498 -0.0647384 13.2397 0.0968221C13.6054 0.19785 14.0132 0.419943 14.4633 0.763103C15.4811 1.54127 16.4855 2.29605 17.4766 3.02745C17.5509 3.08173 17.634 3.11011 17.7258 3.11262C18.0882 3.12013 18.4509 3.11972 18.8141 3.11137C19.1673 3.10302 19.4984 3.14017 19.8073 3.22283C21.1875 3.59104 21.8746 4.57167 21.8688 6.16473C21.8688 6.26743 21.9113 6.34842 21.9965 6.4077C22.6185 6.84354 23.2067 7.27478 23.7611 7.70144C24.2462 8.07466 24.5902 8.53512 24.7931 9.08284C24.9225 9.43185 24.9877 9.92905 24.9885 10.5745C24.9927 15.7678 24.9902 19.5137 24.981 21.8123C24.9793 22.188 24.9004 22.5967 24.7443 23.0384C24.6182 23.3949 24.4212 23.7105 24.1532 23.9852C23.7474 24.401 23.3132 24.6841 22.8506 24.8344C22.51 24.9437 22.0174 24.9976 21.3728 24.9959C15.6426 24.9759 9.90285 24.9771 4.15346 24.9997C3.24922 25.0039 2.6393 24.9667 2.32369 24.8882C1.02871 24.5663 0.0480711 23.3878 0.0117512 22.0227Z" />
    </svg>
  )
}

function LanguageIcon() {
  return (
    <svg width="22" height="20" viewBox="0 0 26 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.7372 0L13.3793 0.867999C13.3412 0.96106 13.3831 1.03889 13.5049 1.1015C14.2257 2.09555 14.8006 3.02319 15.2295 3.88442C15.7236 4.87763 16.1703 6.02397 16.5696 7.32343C16.6144 7.53408 16.617 7.6779 16.5772 7.75489L8.67383 7.75362C8.97585 6.70542 9.2673 5.87042 9.54817 5.2486C10.2326 3.73257 11.1822 2.1019 12.3971 0.356591C12.5341 0.160318 12.6475 0.0414542 12.7372 0Z" />
      <path d="M6.59248 9.35352C6.43005 9.83574 6.35941 10.3057 6.38056 10.7634C6.37379 11.0992 6.34756 11.4495 6.30188 11.8141C6.23166 12.3776 6.26762 13.2413 6.40974 14.4054C6.30442 14.7265 6.45035 14.8965 6.51253 15.1935C6.49815 15.284 6.51126 15.3851 6.55187 15.4968C6.55899 15.5154 6.56147 15.5355 6.55911 15.5553C6.55674 15.5752 6.54959 15.5941 6.53827 15.6107C6.52694 15.6273 6.51177 15.6409 6.49404 15.6504C6.47631 15.66 6.45654 15.6652 6.43639 15.6655C4.51681 15.6892 2.58158 15.6854 0.630695 15.6541C0.578243 15.6533 0.534674 15.6309 0.499988 15.5869C0.44669 15.5623 0.413273 15.5205 0.399737 15.4612C0.307099 15.0412 0.218269 14.6821 0.161163 14.2037C0.140013 14.026 0.116325 13.8437 0.0900992 13.6567C0.0571051 13.4164 0.039339 12.8424 0.036801 11.9347C0.036801 11.8924 0.032994 11.8505 0.02538 11.809L0 11.6783L0.026649 11.1707C0.141705 11.0751 0.173854 10.9042 0.123093 10.6581L0.290602 9.71137C0.29737 9.66992 0.298216 9.62847 0.29314 9.58701C0.274528 9.43642 0.334171 9.36113 0.47207 9.36113C2.49402 9.36028 4.53416 9.35775 6.59248 9.35352Z" />
      <path d="M17.3434 11.0115C17.3459 12.0724 17.3256 13.1291 17.2825 14.1815C17.2749 14.3608 17.2503 14.533 17.2089 14.698C17.1112 15.0825 17.2939 15.6726 16.667 15.6675C16.0181 15.6641 15.3697 15.6683 14.7216 15.6802L8.93878 15.6827C8.8068 15.6743 8.6744 15.6675 8.54158 15.6624C8.05555 15.6421 8.19768 14.9899 8.13042 14.6739C8.05259 14.3109 8.01367 13.9049 8.01367 13.4556C8.01367 12.6232 8.0179 11.8207 8.02636 11.0483C8.03017 10.6778 8.15199 10.3326 8.17484 9.96078C8.18753 9.76197 8.20445 9.5602 8.2256 9.35547L17.0033 9.36054C17.0339 9.36055 17.0634 9.37159 17.0865 9.39164C17.1096 9.41169 17.1247 9.4394 17.1289 9.46968L17.3434 11.0115Z" />
      <path d="M25.1784 10.4379C25.1327 10.7306 25.1665 10.9718 25.2799 11.1613L25.3154 13.1701L25.0261 15.1929C25.0608 15.3596 25.0117 15.4886 24.8789 15.5799C24.7994 15.6349 24.7131 15.6628 24.62 15.6637C22.7275 15.6891 20.8477 15.6929 18.9806 15.6751C18.9345 15.6744 18.8904 15.6568 18.8565 15.6257C18.8225 15.5946 18.8012 15.5521 18.7966 15.5063L18.7851 15.4023C18.907 15.0596 18.9683 14.8261 18.9691 14.7018C18.97 14.4463 18.9789 14.2407 18.9958 14.085C19.0296 13.7661 19.0465 13.6049 19.0465 13.6016C19.0745 12.7784 19.0652 11.9557 19.0186 11.1333C19.0144 11.0504 18.9873 10.9485 18.9374 10.8275C18.9721 10.3546 18.9044 9.86392 18.7344 9.35547L24.8459 9.36054C24.8759 9.36102 24.9048 9.37158 24.9278 9.39049C24.9509 9.4094 24.9668 9.43554 24.9728 9.4646L25.1784 10.4379Z" />
    </svg>
  )
}

function ApplicationsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 35 35" className="mx-auto mb-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.691449 12.6302C0.530125 12.3812 0.374062 12.1392 0.22326 11.9042C0.0654431 11.6587 -0.00645103 11.3507 0.00757711 10.9801C0.0198517 10.7101 0.13383 10.4295 0.19871 10.1524C0.165978 10.1314 0.17007 10.0928 0.210985 10.0367C0.409717 9.91163 0.518435 9.75381 0.537139 9.56326L4.33 7.3135C4.66784 7.20478 4.95892 7.04112 5.20325 6.82252L7.65817 5.42496C8.01823 5.31858 8.33386 5.13271 8.60507 4.86735L9.53794 4.37461C9.84305 4.26589 10.1219 4.10281 10.3744 3.88538L10.9408 3.52415C11.081 3.55104 11.2225 3.49493 11.3651 3.35581L12.6083 2.61408C12.9579 2.51822 13.2344 2.35163 13.4378 2.11432L14.6705 1.45675C14.8727 1.40649 14.999 1.32057 15.0492 1.19899C15.5858 0.942974 16.1908 0.60513 16.8641 0.185455C17.2417 -0.0495161 17.617 -0.0612064 17.9899 0.150385C19.554 1.03883 21.1199 1.92436 22.6876 2.80696C23.4392 3.23015 24.1845 3.65859 24.9233 4.09229L25.0671 4.17471C26.2396 4.82351 27.4338 5.50504 28.6495 6.21931L28.9774 6.39992C29.2218 6.52617 29.5988 6.74244 30.1084 7.04872L30.3276 7.17147C31.852 8.00146 33.0409 8.67365 33.8943 9.18801C34.4402 9.5165 34.7734 9.96423 34.8938 10.5312C35.0072 11.0608 34.9324 11.5699 34.6693 12.0585C34.2929 12.7576 33.6242 13.1071 32.6633 13.1071C22.5666 13.106 12.4692 13.106 2.37132 13.1071C1.67809 13.1071 1.11814 12.9481 0.691449 12.6302Z" />
      <path d="M6.89418 24.1821H11.8514C11.9244 24.1821 11.9944 24.1531 12.046 24.1015C12.0977 24.0499 12.1267 23.9798 12.1267 23.9068L12.1179 15.383L14.0152 15.3988C14.0385 15.3988 14.0608 15.4082 14.0772 15.4249C14.0937 15.4417 14.1029 15.4645 14.1029 15.4882L14.0959 23.9629C14.0959 24.0892 14.159 24.1523 14.2853 24.1523L20.7961 24.1611C20.8533 23.7519 20.8738 23.3463 20.8574 22.9441C20.827 22.1808 20.8118 21.7769 20.8118 21.7325C20.813 21.2017 20.8007 20.6698 20.775 20.1368L20.7908 15.5723C20.7913 15.5178 20.8131 15.4656 20.8515 15.4272C20.8899 15.3887 20.9419 15.3672 20.996 15.3672L22.7109 15.3689C22.7574 15.3689 22.802 15.3872 22.8349 15.4198C22.8678 15.4523 22.8863 15.4965 22.8863 15.5425L22.8828 23.9314C22.8828 24.0915 22.9622 24.1716 23.1212 24.1716L28.3379 24.1769C28.3812 24.1769 28.4227 24.1597 28.4533 24.1291C28.4838 24.0985 28.501 24.057 28.501 24.0138L28.508 15.4952C28.508 15.4617 28.5215 15.4296 28.5455 15.4059C28.5695 15.3822 28.6021 15.3689 28.636 15.3689H30.3843C30.5293 15.3689 30.6017 15.4414 30.6017 15.5864V24.0068C30.6017 24.0757 30.6362 24.1155 30.7052 24.126C31.4615 24.2464 31.7579 24.7222 31.5942 25.5534C31.5545 25.7579 31.4528 25.9146 31.2891 26.0233C31.0366 26.1893 30.7858 26.2729 30.5368 26.2741C21.8943 26.2811 13.2513 26.284 4.6076 26.2828C4.47901 26.2828 4.17273 26.2197 3.68876 26.0935C3.20011 25.3733 3.24102 24.7427 3.8115 24.2014L4.16747 24.1663C4.24462 24.1956 4.30833 24.1593 4.3586 24.0576C4.38432 24.0062 4.39659 23.9395 4.39542 23.8577C4.37789 21.0346 4.36035 18.2167 4.4077 15.3917L6.2559 15.3882C6.27892 15.388 6.30174 15.3924 6.32302 15.4012C6.34431 15.4101 6.36362 15.4231 6.37981 15.4397C6.396 15.4562 6.40874 15.4758 6.41728 15.4974C6.42581 15.519 6.42997 15.5421 6.4295 15.5653C6.37923 18.3195 6.36638 21.0749 6.39092 23.8314C6.39209 24.0804 6.55985 24.1973 6.89418 24.1821Z" />
      <path d="M1.97347 30.4231C1.62511 29.8538 1.61342 29.3073 1.9384 28.7836C2.14648 28.614 2.36392 28.5293 2.59071 28.5293C12.5273 28.5305 22.4639 28.5305 32.4005 28.5293C32.8669 28.5293 33.2527 28.9501 33.2755 29.4376C33.3106 30.2419 32.9166 30.644 32.0936 30.644C22.2739 30.6405 12.4542 30.6399 2.63455 30.6423C2.44634 30.6423 2.22598 30.5692 1.97347 30.4231Z" />
      <path d="M0.000986353 34.4119C-0.00953475 34.0098 0.064113 33.6111 0.22193 33.216C0.456901 33.0068 0.7059 32.9021 0.968928 32.9021C12.0161 32.8998 23.0632 32.8998 34.1104 32.9021C34.1957 32.9021 34.3185 32.9507 34.4786 33.0477C35.0292 33.3791 35.0696 34.1314 34.7469 34.6188C34.5961 34.8468 34.3693 34.9608 34.0666 34.9608C23.999 34.983 12.908 34.9958 0.793576 34.9993C0.527041 34.9993 0.262845 34.8035 0.000986353 34.4119Z" />
    </svg>
  )
}

function VerificationIcon() {
  return (
    <svg width="36" height="32" viewBox="0 0 40 35" className="mx-auto mb-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.92801 0.0102136C8.37486 -0.00497592 11.8235 -0.00322316 15.2738 0.0154716C15.9597 0.0201453 16.6467 0.365998 17.3349 1.05303C20.0234 3.73689 22.6898 6.40674 25.3339 9.06256C25.6722 9.40432 25.9316 9.85475 26.0297 10.3385L26.1436 10.8608C26.188 11.0465 26.2102 11.2358 26.2102 11.4286C26.2079 14.0015 26.2056 16.5621 26.2032 19.1104C26.2032 19.1996 26.1852 19.288 26.1503 19.3702C26.1154 19.4524 26.0642 19.5268 25.9999 19.5889L24.1579 21.3713L24.0492 13.3004C24.0282 13.1766 23.9365 13.1141 23.7741 13.1129C21.2772 13.1059 18.7791 13.1059 16.2798 13.1129C15.5542 13.1141 14.8397 12.8202 14.1363 12.2313L13.735 11.8142L13.2057 10.4209C13.2478 7.97067 13.2501 5.5164 13.2127 3.05804C13.2069 2.65844 13.1525 2.3751 13.0497 2.20801L12.9954 2.18348C10.0942 2.1788 7.19241 2.1788 4.29006 2.18348C3.22621 2.18523 2.6899 2.57081 2.22195 3.50321C2.11445 3.71937 2.06071 3.93319 2.06071 4.14467C2.06889 13.0995 2.06655 21.966 2.0537 30.7444C2.0537 31.0996 2.1203 31.4022 2.2535 31.6522C2.60577 32.3095 3.23322 32.8475 3.99737 32.8493C8.26678 32.8598 12.7231 32.8592 17.3664 32.8475C17.3845 32.8475 17.4024 32.8514 17.4188 32.8591C17.4351 32.8667 17.4496 32.8779 17.4612 32.8918L17.4856 32.9395C17.4901 32.957 17.4907 32.9752 17.4874 32.993C17.3682 33.6298 17.3822 34.2648 17.5294 34.8981L17.5288 34.9333C17.526 34.9448 17.5207 34.9555 17.5133 34.9646C17.5059 34.9737 17.4966 34.9809 17.486 34.9858C17.4754 34.9907 17.4639 34.9931 17.4523 34.9928L3.56972 34.9454C3.29982 34.8157 3.01823 34.7322 2.72495 34.6948L2.35515 34.5336C2.14366 34.3244 1.90122 34.1696 1.62781 34.0691L1.1879 33.6397L0.61829 32.8528C0.238553 32.1541 0.0481 31.5553 0.0469316 31.0563C0.0387526 22.5467 0.0387526 14.0371 0.0469316 5.5275L0.00486842 4.53551C-0.0185 4.00855 0.0422579 3.56163 0.187142 3.19475L0.599011 2.09935C1.23113 1.09685 2.1314 0.44954 3.29982 0.157435L4.92801 0.0102136Z" />
      <path d="M25.341 33.9049L24.6977 34.0469L20.5475 35.0003C20.1222 34.7959 19.8669 34.5341 19.7816 34.2152C19.6975 33.9049 19.8815 33.3651 19.9113 32.9831L20.1058 32.3714L20.8823 29.1325L21.4098 27.6866L21.7849 27.1047L22.0565 26.8173C22.3451 26.6701 22.5712 26.4457 22.7348 26.1443L23.0625 25.82C23.3149 25.7079 23.5112 25.5081 23.6514 25.2206L23.8021 25.0577C24.1188 24.8917 24.3618 24.6505 24.5312 24.3338L24.8169 24.0709C25.1207 23.9015 25.3626 23.655 25.5425 23.3313L25.6932 23.1946C26.0145 23.0123 26.2722 22.7535 26.4661 22.4182L26.6046 22.2569C26.9154 22.1004 27.1444 21.8702 27.2916 21.5664C27.336 21.4916 27.3991 21.4291 27.4809 21.3789C27.842 21.1721 28.1323 20.8835 28.352 20.5131L28.359 20.5043C28.7259 20.2846 29.0232 19.992 29.2511 19.6262L29.3615 19.4632C29.6442 19.3114 29.8773 19.0747 30.0608 18.7534L30.0748 18.7517C30.4207 18.5157 30.704 18.2276 30.9248 17.8876L31.2859 17.5564C31.5149 17.4197 31.6884 17.2409 31.8064 17.0201L32.1657 16.6573L32.8019 16.121C32.983 16.0766 33.1776 15.9738 33.3855 15.8125C34.2665 15.4889 35.1049 15.4976 35.9006 15.8388C36.313 16.0152 36.7278 16.312 37.1449 16.7291C37.5726 17.1568 37.9657 17.5576 38.3245 17.9314C38.7369 18.3614 38.9753 18.9082 39.0395 19.5719C39.1727 20.9296 38.7258 21.9993 37.6988 22.781L37.6374 22.8879C37.6351 22.9136 37.6246 22.9352 37.6059 22.9527C34.263 26.2056 30.947 29.486 27.6579 32.7938C27.1403 33.3161 26.5211 33.6473 25.8001 33.7875C25.6459 33.8167 25.4928 33.8559 25.341 33.9049Z" />
    </svg>
  )
}

function AcademicIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 35 35" className="mx-auto mb-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.9514 0C18.1187 0.0479618 18.3047 0.082471 18.5094 0.103527C20.4747 0.303563 22.1188 1.31954 23.3594 2.81103L23.5507 2.90579L25.7774 2.99352C26.0008 3.13156 26.2143 3.1725 26.4178 3.11635C26.6576 3.2731 26.8612 3.33042 27.0285 3.28831C27.1595 3.39008 27.3045 3.47489 27.4636 3.54274C29.9623 4.62364 31.7135 6.93107 31.9995 9.66314L32.1013 10.7475C31.844 11.0833 31.8562 11.3623 32.1382 11.5845C34.1444 13.2679 35.0703 15.4285 34.9159 18.0664L34.8141 18.6823C34.7638 18.8975 34.731 19.1058 34.7158 19.307L33.8157 21.5267L33.6455 21.8109C33.3238 22.025 33.0746 22.3303 32.898 22.7269C32.6839 22.9959 32.4142 23.2305 32.089 23.4305C31.896 23.6118 31.8568 23.8306 31.9715 24.0868C32.0721 24.3149 32.0966 24.5184 32.0452 24.6974C31.9375 25.0659 31.9147 25.3806 31.9767 25.6415L31.6784 26.8943C31.3719 27.2862 31.176 27.7214 31.0906 28.1998L30.673 28.8719C30.3536 29.0836 30.1144 29.3766 29.9553 29.751L29.8149 29.9106C29.5178 30.03 29.2809 30.2206 29.1043 30.4827L28.3901 31.0021C28.1 31.0208 27.9064 31.1284 27.8093 31.3249L26.0564 31.9408C25.8248 31.9303 25.6253 31.9712 25.458 32.0637L23.3541 32.1795C23.1237 32.2847 22.9699 32.4649 22.8926 32.7199C21.9334 33.7412 20.7262 34.4226 19.2709 34.7641C18.3059 34.9911 17.3805 35.0543 16.495 34.9536L15.3281 34.7062L14.2051 34.3027C14.0846 34.1892 13.9448 34.1038 13.7857 34.0465L13.6401 33.9552C13.5009 33.8172 13.3254 33.7271 13.1137 33.685L12.2609 33.0638C12.103 32.7749 11.9152 32.5111 11.6976 32.2725C11.5783 32.1414 11.4426 32.0847 11.2906 32.1023C10.9338 32.1257 10.6115 32.1385 10.3237 32.1409C9.9447 32.1432 9.57446 32.0982 9.21299 32.0058L8.72694 31.8847C8.0157 31.7127 7.33897 31.4542 6.69675 31.1091L5.28071 30.0528L4.86835 29.679L4.7736 29.5843L4.2349 28.8052L4.18051 28.821C4.16413 28.7052 4.0647 28.5262 3.88221 28.284C3.70323 28.0454 3.46459 27.478 3.16629 26.582C2.9452 25.9169 2.96976 25.2817 2.85395 24.6167C2.77148 24.15 3.20139 23.592 2.60303 23.2866L2.48547 23.2042C1.7871 22.4707 1.30631 21.8782 1.0431 21.4267C0.557635 20.5902 0.234185 19.6234 0.0727526 18.5261C-0.017322 17.9202 -0.023756 17.3248 0.0534509 16.7399C0.131828 16.1456 0.265185 15.5619 0.453523 14.9887C0.88401 13.6808 1.62683 12.5964 2.68199 11.7354C3.13646 11.3652 2.80658 10.6616 2.89607 10.1632L2.99959 9.1999C3.01012 8.95073 3.14173 8.80158 3.15752 8.56821L3.26631 8.11198C3.64883 7.16562 4.15185 6.26662 4.77535 5.41501L5.74395 4.53941C6.05862 4.40372 6.32417 4.21772 6.54058 3.98142C6.74998 3.92878 6.95001 3.82876 7.14069 3.68136L7.51269 3.53221L8.39881 3.20408L8.56726 3.17776C8.72402 3.18244 8.86615 3.14618 8.99365 3.06897L9.14982 3.00054L9.34986 2.94088L9.45339 2.93562L11.3327 2.95141C11.3923 2.95141 11.445 2.93269 11.4906 2.89526C11.8041 2.64024 12.0685 2.33375 12.2837 1.97579L13.033 1.38446C13.2377 1.33767 13.4102 1.22127 13.5506 1.03527L13.5927 1.01071L15.9879 0.142131L16.023 0.110546L17.9514 0Z" />
      <path d="M24.0556 10.8809L26.2525 13.083C26.2637 13.0942 26.2699 13.1093 26.2699 13.1251C26.2699 13.1409 26.2637 13.1561 26.2525 13.1672L15.3225 24.099L11.8622 20.7563L9.97239 18.8946L8.85991 17.7084C8.83226 17.679 8.81081 17.6444 8.79685 17.6065C8.78289 17.5687 8.77671 17.5284 8.77868 17.4881C8.78064 17.4478 8.79071 17.4083 8.80829 17.372C8.82587 17.3357 8.85058 17.3033 8.88097 17.2767L9.06521 17.01L9.42843 16.6433C9.72673 16.4748 9.82675 16.359 9.72849 16.2959L10.5778 15.5238L10.9515 15.3273C12.3178 16.6831 13.6859 18.0383 15.0558 19.3929C15.2113 19.5485 15.2932 19.569 15.3014 19.4543C15.4359 19.452 15.5705 19.383 15.705 19.2473C17.434 17.4949 20.2175 14.7061 24.0556 10.8809Z" />
    </svg>
  )
}

/* ── Decorative underline SVG ────────────────────────────────────── */
function HeaderUnderline() {
  return (
    <svg width="125" height="12" viewBox="0 0 125 12" className="mx-auto mt-1" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 10C20 2 40 2 62.5 6C85 10 105 2 123 2" stroke="#C8A84B" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/* ── Main Component ──────────────────────────────────────────────── */

export default function LoginPage() {
  const { t } = useTranslation()
  const { lang, toggleLanguage } = useLanguage()
  const { login, verify2FA } = useAuth()
  const navigate = useNavigate()

  const [phase, setPhase] = useState<Phase>('credentials')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [tempToken, setTempToken] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)

  const announcements = [
    { image: '/ann-cybersecurity.jpg', textAr: 'الجدول الزمني للتسجيل للفصل الدراسي الثاني', textEn: 'Registration Timeline for Second Semester' },
    { image: '/ann-calendar.jpg', textAr: 'اللائحة التنظيمية للشؤون الدراسية والأكاديمية', textEn: 'Academic Affairs Regulations' },
    { image: '/ann-regulations.png', textAr: 'بوابة الخريجين', textEn: 'Graduates Portal' },
    { image: '/ann-graduates.png', textAr: 'نظام التحقق من الوثائق الأكاديمية', textEn: 'Academic Document Verification' },
  ]

  const isValidStudentId = (id: string) => /^45\d{6}$/.test(id)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!isValidStudentId(username)) {
      setError(lang === 'ar' ? 'الرقم الجامعي يجب أن يتكون من 8 أرقام ويبدأ بـ 45' : 'University ID must be 8 digits and start with 45')
      return
    }
    setIsLoading(true)
    try {
      const res = await login(username, password)
      setTempToken(res.tempToken)
      setPhase('twofa')
    } catch {
      setError(t('login.error_invalid'))
    } finally {
      setIsLoading(false)
    }
  }

  const handle2FA = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await verify2FA(tempToken, code)
      navigate('/dashboard')
    } catch {
      setError(t('login.error_invalid_code'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* ═══ Top Navigation Bar ═══ */}
      <nav className="bg-white border-b-[7px] border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-[8%] flex items-center justify-between py-5">
          {/* Logo */}
          <div className="flex items-center gap-3 w-1/2">
            <img src="/logo_edu.svg" alt="KSU EduGate" className="h-16 ms-4 object-contain max-w-[280px]" />
          </div>
          {/* Nav Links */}
          <div className="flex items-center">
            <a href="#" className="flex flex-col items-center px-6 py-2.5 text-sm text-black border-s border-gray-200 hover:bg-ksu-blue hover:text-white transition-colors duration-200 group">
              <span className="text-ksu-blue group-hover:text-white"><HomeIcon /></span>
              <span className="mt-1.5">{t('login.home')}</span>
            </a>
            <a href="#" className="flex flex-col items-center px-6 py-2.5 text-sm text-black border-s border-gray-200 hover:bg-ksu-blue hover:text-white transition-colors duration-200 group">
              <span className="text-ksu-blue group-hover:text-white"><ContactIcon /></span>
              <span className="mt-1.5">{t('login.contact')}</span>
            </a>
            <button
              onClick={toggleLanguage}
              className="flex flex-col items-center px-6 py-2.5 text-sm text-black border-s border-gray-200 hover:bg-ksu-blue hover:text-white transition-colors duration-200 group"
            >
              <span className="text-ksu-blue group-hover:text-white"><LanguageIcon /></span>
              <span className="mt-1.5">{lang === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ═══ Header Title ═══ */}
      <div className="text-center py-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">
          {t('login.page_title')} <span className="text-ksu-gold text-base font-normal">( {t('login.page_title_beta')} )</span>
        </h1>
        <HeaderUnderline />
      </div>

      {/* ═══ Services Section ═══ */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-[5%] py-5">
          <div className="flex items-start justify-center">
            {/* Service Card 1 */}
            <div className="flex-1 flex flex-col items-center text-center py-2.5 border-s border-gray-300 cursor-pointer transition-all duration-300 hover:[text-shadow:0_0_10px_#0084bd] group">
              <div className="text-ksu-blue transition-transform group-hover:scale-110">
                <ApplicationsIcon />
              </div>
              <span className="text-base text-gray-800 group-hover:text-ksu-blue transition-colors duration-200">
                {t('login.service_applications')}
              </span>
            </div>
            {/* Service Card 2 */}
            <div className="flex-1 flex flex-col items-center text-center py-2.5 border-s border-gray-300 cursor-pointer transition-all duration-300 hover:[text-shadow:0_0_10px_#0084bd] group">
              <div className="text-ksu-blue transition-transform group-hover:scale-110">
                <VerificationIcon />
              </div>
              <span className="text-base text-gray-800 group-hover:text-ksu-blue transition-colors duration-200">
                {t('login.service_verification')}
              </span>
            </div>
            {/* Service Card 3 */}
            <div className="flex-1 flex flex-col items-center text-center py-2.5 border-s border-gray-300 cursor-pointer transition-all duration-300 hover:[text-shadow:0_0_10px_#0084bd] group">
              <div className="text-ksu-blue transition-transform group-hover:scale-110">
                <AcademicIcon />
              </div>
              <span className="text-base text-gray-800 group-hover:text-ksu-blue transition-colors duration-200">
                {t('login.service_academic')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Login Section ═══ */}
      <div className="bg-black">
        {/* Login heading (mobile) */}
        <div className="flex items-center justify-center gap-2 py-3 sm:hidden">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="text-white font-semibold">{t('login.login_heading')}</span>
        </div>

        {error && (
          <div className="max-w-4xl mx-auto px-4 pt-2">
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-2 flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 ms-2">&times;</button>
            </div>
          </div>
        )}

        {phase === 'credentials' ? (
          <form onSubmit={handleLogin} className="max-w-4xl mx-auto px-4 sm:px-[5%] py-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Username */}
              <div className="flex items-center gap-2 flex-1">
                <label className="text-white text-sm font-bold whitespace-nowrap shrink-0">
                  {t('login.username')}
                </label>
                <input
                  id="username"
                  type="text"
                  inputMode="numeric"
                  maxLength={8}
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/\D/g, ''))}
                  placeholder={t('login.username_placeholder')}
                  required
                  autoFocus
                  className="w-full h-10 px-3 text-sm rounded border-0 focus:outline-none focus:ring-2 focus:ring-ksu-blue transition-shadow"
                />
              </div>
              {/* Password */}
              <div className="flex items-center gap-2 flex-1">
                <label className="text-white text-sm font-bold whitespace-nowrap shrink-0">
                  {t('login.password')}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.password_placeholder')}
                  required
                  className="w-full h-10 px-3 text-sm rounded border-0 focus:outline-none focus:ring-2 focus:ring-ksu-blue transition-shadow"
                />
              </div>
              {/* Submit + forgot */}
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-ksu-blue hover:bg-[#006a99] active:bg-[#005580] text-white text-sm font-bold w-full px-8 h-10 rounded transition-colors duration-200 disabled:opacity-60"
                >
                  {isLoading ? t('login.loading') : t('login.submit')}
                </button>
                <a href="#" className="text-white hover:text-sky-300 text-xs transition-colors">
                  {t('login.forgot_password')}
                </a>
              </div>
            </div>
          </form>
        ) : (
          /* ── 2FA Phase ── */
          <form onSubmit={handle2FA} className="max-w-lg mx-auto px-4 py-6">
            <div className="bg-white rounded-[5px] p-6 shadow-lg">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-ksu-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">{t('login.twofa_title')}</h2>
                <p className="text-xs text-gray-500 mt-1">{t('login.twofa_subtitle')}</p>
              </div>
              <div className="flex items-center gap-3">
                <input
                  id="code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder={t('login.twofa_placeholder')}
                  required
                  autoFocus
                  className="flex-1 h-10 px-3 text-center text-xl tracking-widest border border-ksu-blue rounded-[5px] focus:outline-none focus:ring-2 focus:ring-ksu-blue"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-ksu-blue hover:bg-sky-700 text-white text-sm font-bold px-6 h-10 rounded-[5px] transition-colors disabled:opacity-60"
                >
                  {isLoading ? t('login.loading') : t('login.twofa_verify')}
                </button>
              </div>
              <button
                type="button"
                onClick={() => { setPhase('credentials'); setCode(''); setError('') }}
                className="w-full text-sm text-gray-500 hover:text-ksu-blue transition-colors mt-4"
              >
                {lang === 'ar' ? '→' : '←'} {t('login.twofa_back')}
              </button>
            </div>
          </form>
        )}

      </div>

      {/* ═══ Announcements Section ═══ */}
      <div className="flex-1 bg-gray-100">
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-gray-800">{t('login.announcements_title')}</h2>
          <HeaderUnderline />
        </div>
        <div className="relative max-w-[85%] mx-auto pb-10">
          {/* Prev arrow */}
          <button
            onClick={() => setCarouselIndex(i => Math.max(0, i - 1))}
            disabled={carouselIndex === 0}
            className="absolute -start-12 top-[105px] w-9 h-9 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 shadow-sm transition-colors disabled:opacity-30 z-10"
            aria-label="previous"
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
              <path d={lang === 'ar' ? 'M2 1.5L7.5 7.5L2 13.5' : 'M7.5 1.5L2 7.5L7.5 13.5'} stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Next arrow */}
          <button
            onClick={() => setCarouselIndex(i => Math.min(announcements.length - 3, i + 1))}
            disabled={carouselIndex >= announcements.length - 3}
            className="absolute -end-12 top-[105px] w-9 h-9 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 shadow-sm transition-colors disabled:opacity-30 z-10"
            aria-label="next"
          >
            <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
              <path d={lang === 'ar' ? 'M7.5 1.5L2 7.5L7.5 13.5' : 'M2 1.5L7.5 7.5L2 13.5'} stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex gap-5">
            {announcements.slice(carouselIndex, carouselIndex + 3).map((ann, idx) => (
              <a key={carouselIndex + idx} href="#" className="flex-1 bg-white rounded-md border border-ksu-blue/40 hover:border-ksu-blue hover:shadow-[0_4px_16px_rgba(0,132,189,0.18)] transition-all duration-300 cursor-pointer group overflow-hidden">
                <div className="h-[210px] overflow-hidden">
                  <img src={ann.image} alt={lang === 'ar' ? ann.textAr : ann.textEn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="px-3 py-2.5 text-end border-t border-gray-100">
                  <p className="text-sm text-gray-800 font-medium line-clamp-2 leading-relaxed">
                    {lang === 'ar' ? ann.textAr : ann.textEn}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Footer ═══ */}
      <footer className="bg-ksu-blue text-white">
        <div className="max-w-7xl mx-auto px-[8%] py-4 flex items-center justify-between">
          {/* KSU Logo */}
          <div className="w-1/3 flex items-center">
            <img src="/ksu-footer-logo.svg" alt="KSU" className="h-16" onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.nextElementSibling?.classList.remove('hidden')
            }} />
            <div className="hidden w-14 h-14 bg-white rounded-full items-center justify-center">
              <span className="text-ksu-blue font-bold text-xl">ك</span>
            </div>
          </div>
          {/* Copyright */}
          <div className="w-1/3 text-center">
            <p className="text-xs text-white" style={{ fontSize: '0.8rem' }}>
              {t('login.footer_copyright')}
            </p>
          </div>
          {/* Vision 2030 */}
          <div className="w-1/3 flex justify-end">
            <img src="/vision2030.svg" alt="Vision 2030" className="h-16" style={{ margin: '0 auto 0 0' }} onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.nextElementSibling?.classList.remove('hidden')
            }} />
            <div className="hidden text-white text-xs font-bold leading-tight text-center border border-white/30 rounded-md px-3 py-2">
              <span className="block text-lg">2030</span>
              <span className="block text-[10px]">VISION</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
