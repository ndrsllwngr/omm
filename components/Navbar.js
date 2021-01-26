import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/context/authContext'
import { IoCreate, IoLogIn, IoPerson } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { PrimaryBtn, SecondaryBtn, TertiaryBtn } from '@/components/ui/Buttons'

//https://tailwindcomponents.com/component/responsive-navbar-2
export const Navbar = () => {
  return (
    <nav className="flex items-center bg-custom-gray shadow-lg">
      <div className={'max-w-7xl w-full mx-auto flex justify-between items-center flex-wrap py-4'}>
        <div className="flex lg:w-auto justify-between w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
          <Link
            href={'/'}
            className="flex cursor-pointer items-center flex-shrink-0 text-gray-800 mr-16"
          >
            <a>
              <svg
                width="193"
                height="64"
                viewBox="0 0 193 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.73047 49.5156C2.32943 49.2578 2.01432 48.9284 1.78516 48.5273C1.52734 48.1263 1.32682 47.6966 1.18359 47.2383C1.01172 46.7799 0.882812 46.3073 0.796875 45.8203C0.682292 45.3047 0.567708 44.8177 0.453125 44.3594C0.453125 43.9583 0.539062 43.6719 0.710938 43.5C0.882812 43.2995 1.06901 43.1133 1.26953 42.9414C1.95703 42.9128 2.57292 42.8555 3.11719 42.7695C3.66146 42.6836 4.19141 42.5977 4.70703 42.5117C5.22266 42.4258 5.73828 42.3542 6.25391 42.2969C6.76953 42.2109 7.32812 42.168 7.92969 42.168C8.35938 41.2799 8.76042 40.4349 9.13281 39.6328C9.50521 38.8021 9.86328 38.0143 10.207 37.2695C10.3789 36.5534 10.5938 35.8945 10.8516 35.293C11.138 34.6628 11.4102 34.0755 11.668 33.5312C11.9258 32.9583 12.1549 32.3997 12.3555 31.8555C12.556 31.2826 12.6849 30.681 12.7422 30.0508C13.0859 29.0482 13.3867 28.1315 13.6445 27.3008C13.931 26.4414 14.1458 25.4245 14.2891 24.25C13.2005 24.4219 12.3268 24.5938 11.668 24.7656C11.0091 24.9089 10.5365 25.0521 10.25 25.1953C9.67708 25.1667 9.21875 25.0521 8.875 24.8516C8.5599 24.651 8.30208 24.4076 8.10156 24.1211C7.90104 23.8346 7.72917 23.5052 7.58594 23.1328C7.44271 22.7604 7.27083 22.3737 7.07031 21.9727C7.1849 21.7148 7.21354 21.3424 7.15625 20.8555C7.09896 20.3398 6.92708 19.9674 6.64062 19.7383C6.86979 19.681 7.04167 19.4948 7.15625 19.1797C7.27083 18.8359 7.28516 18.5781 7.19922 18.4062C7.6862 18.263 8.20182 18.1771 8.74609 18.1484C9.29036 18.0911 9.82031 18.0482 10.3359 18.0195C10.8802 17.9622 11.3958 17.9049 11.8828 17.8477C12.3698 17.7617 12.7852 17.6042 13.1289 17.375C14.6185 17.3177 16.1654 17.2604 17.7695 17.2031C19.4023 17.1458 20.9062 17.0742 22.2812 16.9883C22.7969 17.1602 23.3841 17.2461 24.043 17.2461C24.7305 17.2461 25.4036 17.2891 26.0625 17.375C26.75 17.4609 27.3516 17.6471 27.8672 17.9336C28.4115 18.2201 28.7839 18.7214 28.9844 19.4375C29.4141 19.4948 29.7292 19.6094 29.9297 19.7812C30.1589 19.9531 30.3021 20.168 30.3594 20.4258C30.4167 20.6549 30.431 20.9271 30.4023 21.2422C30.4023 21.5286 30.4023 21.8151 30.4023 22.1016C29.944 22.4453 29.3568 22.7318 28.6406 22.9609C27.9531 23.1615 27.194 23.3333 26.3633 23.4766C25.5326 23.5911 24.6589 23.6771 23.7422 23.7344C22.8542 23.763 21.9805 23.7917 21.1211 23.8203C20.9779 24.7656 20.7201 25.8828 20.3477 27.1719C20.0039 28.4323 19.6458 29.6784 19.2734 30.9102C18.901 32.1133 18.5716 33.2018 18.2852 34.1758C18.0273 35.1211 17.9128 35.737 17.9414 36.0234C17.6549 36.6823 17.4115 37.2409 17.2109 37.6992C17.0391 38.1576 16.8672 38.5872 16.6953 38.9883C16.5521 39.3893 16.3945 39.7904 16.2227 40.1914C16.0794 40.5638 15.8932 40.9935 15.6641 41.4805H18.5859C18.6432 41.7956 18.7721 42.0104 18.9727 42.125C19.1732 42.2396 19.388 42.3398 19.6172 42.4258C19.8464 42.5117 20.0469 42.6263 20.2188 42.7695C20.4193 42.8841 20.5195 43.0846 20.5195 43.3711C21.0638 43.5143 21.4076 43.7292 21.5508 44.0156C21.694 44.3021 21.7227 44.6172 21.6367 44.9609C21.5794 45.276 21.4362 45.6055 21.207 45.9492C21.0065 46.293 20.806 46.5938 20.6055 46.8516C20.3477 46.7943 20.1042 46.8659 19.875 47.0664C19.6458 47.2383 19.431 47.4388 19.2305 47.668C18.3997 47.5534 17.5833 47.5391 16.7812 47.625C15.9792 47.7109 15.2344 47.7826 14.5469 47.8398C14.4036 47.8685 14.3464 47.9544 14.375 48.0977C14.4036 48.2122 14.375 48.2982 14.2891 48.3555C13.401 48.069 12.4844 47.9544 11.5391 48.0117C10.6224 48.069 9.67708 48.2122 8.70312 48.4414C7.75781 48.6419 6.78385 48.8568 5.78125 49.0859C4.77865 49.3438 3.76172 49.487 2.73047 49.5156ZM50.0167 28.332C49.3006 28.332 48.5271 28.3893 47.6964 28.5039C46.8657 28.5898 46.0493 28.6901 45.2472 28.8047C44.6743 28.8906 44.1157 28.9622 43.5714 29.0195C43.0558 29.0768 42.5831 29.1198 42.1534 29.1484C41.9529 29.7786 41.7524 30.3372 41.5519 30.8242C41.3514 31.3112 41.1365 31.7839 40.9073 32.2422C40.6782 32.7292 40.4633 33.2305 40.2628 33.7461C40.0909 34.2331 39.9191 34.763 39.7472 35.3359C39.4607 35.7943 39.2172 36.224 39.0167 36.625C38.8448 36.9974 38.7016 37.4271 38.587 37.9141C38.2433 38.3438 37.9855 38.8021 37.8136 39.2891C37.6417 39.7474 37.5128 40.1484 37.4269 40.4922L37.255 41.0078C37.0831 41.1797 36.9829 41.3229 36.9542 41.4375C36.9256 41.5234 36.854 41.6094 36.7394 41.6953C36.7107 42.0104 36.6105 42.3255 36.4386 42.6406C36.3813 42.7839 36.3383 42.9271 36.3097 43.0703C36.281 43.1849 36.2667 43.2708 36.2667 43.3281C36.2667 43.6146 36.1951 43.8008 36.0519 43.8867C36.0805 44.0299 36.0805 44.1875 36.0519 44.3594C36.0232 44.5026 35.9946 44.6458 35.9659 44.7891C35.88 45.1328 35.8514 45.4049 35.88 45.6055C35.9659 45.7201 36.0376 45.8203 36.0948 45.9062C36.1808 45.9922 36.2381 46.1068 36.2667 46.25C36.4386 46.3646 36.5675 46.4362 36.6534 46.4648C36.768 46.5508 36.9399 46.651 37.1691 46.7656L37.5558 47.1953C37.699 48.026 37.5701 48.6849 37.1691 49.1719C36.7394 49.7161 36.0089 49.9883 34.9777 49.9883H34.462C34.3188 49.8451 34.2329 49.7305 34.2042 49.6445C33.9751 49.5586 33.7889 49.487 33.6456 49.4297C33.5024 49.3724 33.3735 49.2578 33.2589 49.0859C32.8865 48.9141 32.5857 48.7708 32.3566 48.6562L31.9698 48.4414C31.9698 48.1263 31.9698 47.9544 31.9698 47.9258C31.7693 47.668 31.6118 47.3815 31.4972 47.0664C31.4112 46.7513 31.3396 46.4362 31.2823 46.1211C31.2251 45.8633 31.1534 45.6198 31.0675 45.3906C31.0102 45.1615 30.9243 44.9609 30.8097 44.7891C30.7524 43.1276 30.9099 41.724 31.2823 40.5781C31.6547 39.4323 32.0415 38.3294 32.4425 37.2695C32.6717 36.6966 32.9008 36.1237 33.13 35.5508C33.3592 34.9492 33.5597 34.3333 33.7316 33.7031L34.1183 33.2734C34.3188 32.8151 34.4764 32.4427 34.5909 32.1562C34.7342 31.8411 34.8774 31.526 35.0206 31.2109C35.1066 31.0104 35.1782 30.8242 35.2355 30.6523C35.3214 30.4518 35.393 30.2799 35.4503 30.1367C35.2784 30.1367 35.1209 30.151 34.9777 30.1797C34.8344 30.1797 34.6912 30.194 34.548 30.2227C34.3761 30.2513 34.2185 30.2799 34.0753 30.3086C33.9321 30.3086 33.7889 30.3086 33.6456 30.3086C33.4451 30.3086 33.3019 30.2943 33.2159 30.2656C32.9008 30.4089 32.5571 30.4805 32.1847 30.4805H31.755C31.6691 30.4805 31.5831 30.4805 31.4972 30.4805C31.4399 30.4518 31.3826 30.4375 31.3253 30.4375C31.0389 30.4375 30.8097 30.4805 30.6378 30.5664C30.2941 30.5664 29.9646 30.5664 29.6495 30.5664H29.2198C29.1626 30.5664 29.0909 30.5807 29.005 30.6094C28.9191 30.6094 28.8474 30.6094 28.7902 30.6094C28.5896 30.6094 28.3748 30.5951 28.1456 30.5664C27.9165 30.5091 27.673 30.4089 27.4152 30.2656C27.0714 29.8073 26.8422 29.5638 26.7277 29.5352L26.3409 29.0195C26.3123 28.8477 26.2693 28.6901 26.212 28.5469C26.1547 28.375 26.0974 28.1888 26.0402 27.9883C25.9256 27.7018 25.811 27.401 25.6964 27.0859C25.6105 26.7422 25.5675 26.3411 25.5675 25.8828C25.5961 25.6536 25.6534 25.4818 25.7394 25.3672C25.8253 25.2526 25.8969 25.1523 25.9542 25.0664L26.0831 24.4219L26.6417 24.4648H27.8448C28.7615 24.4648 29.6925 24.4362 30.6378 24.3789C31.5831 24.293 32.5571 24.207 33.5597 24.1211C34.1326 24.0638 34.7055 24.0065 35.2784 23.9492C35.88 23.8919 36.4959 23.8346 37.1261 23.7773C37.2407 23.5195 37.3553 23.276 37.4698 23.0469L37.8995 22.832C38.4152 22.8034 38.7732 22.875 38.9737 23.0469C39.2029 23.1901 39.3891 23.3333 39.5323 23.4766C40.1626 23.4193 40.7928 23.362 41.423 23.3047C42.0818 23.2188 42.7407 23.1185 43.3995 23.0039C44.3735 22.8607 45.3474 22.7318 46.3214 22.6172C47.324 22.5026 48.2836 22.4453 49.2003 22.4453C49.6014 22.4453 49.9881 22.4596 50.3605 22.4883C50.7329 22.5169 51.0766 22.5599 51.3917 22.6172L51.8214 22.918C51.9073 23.0898 52.0219 23.2474 52.1652 23.3906C52.337 23.5339 52.5089 23.6771 52.6808 23.8203C53.0245 24.1354 53.3683 24.5078 53.712 24.9375C54.0558 25.3672 54.1847 25.9974 54.0987 26.8281C53.8696 27.1719 53.6977 27.3724 53.5831 27.4297L53.1964 27.9453L52.7667 27.9023C52.5948 27.9023 52.4373 27.931 52.2941 27.9883C52.1508 28.0169 52.0076 28.0599 51.8644 28.1172C51.7498 28.1745 51.6352 28.2318 51.5206 28.2891C51.406 28.3177 51.2771 28.3464 51.1339 28.375C50.8761 28.375 50.6612 28.375 50.4894 28.375C50.3461 28.3464 50.1886 28.332 50.0167 28.332ZM60.2639 22.918C60.2353 23.0612 60.1636 23.1471 60.0491 23.1758C59.9631 23.1758 59.8915 23.2474 59.8342 23.3906C59.7196 23.7057 59.648 23.9062 59.6194 23.9922C59.5907 24.0495 59.5621 24.0924 59.5334 24.1211C59.5048 24.1211 59.4618 24.1497 59.4045 24.207C59.3759 24.2643 59.3043 24.4362 59.1897 24.7227C58.9892 25.1237 58.7314 25.5391 58.4162 25.9688C58.1298 26.3698 57.9436 26.7708 57.8577 27.1719C57.4566 27.5156 56.9553 27.9596 56.3537 28.5039C55.7808 29.0195 55.2366 29.3776 54.7209 29.5781C54.4631 29.4635 54.0478 29.2917 53.4748 29.0625C52.9306 28.8047 52.4006 28.5182 51.885 28.2031C51.398 27.8594 51.0256 27.5156 50.7678 27.1719C50.51 26.7995 50.5386 26.4414 50.8537 26.0977C51.3694 25.5534 51.8134 24.9089 52.1858 24.1641C52.5868 23.3906 52.9306 22.5742 53.217 21.7148C53.5321 20.8268 53.7899 19.9245 53.9905 19.0078C54.2196 18.0625 54.4202 17.1602 54.592 16.3008C54.7066 16.4154 54.8212 16.4583 54.9358 16.4297C55.079 16.3724 55.1936 16.3008 55.2795 16.2148C55.3941 16.1003 55.4944 15.9714 55.5803 15.8281C55.6949 15.6849 55.7808 15.5703 55.8381 15.4844C56.01 15.6276 56.2965 15.7995 56.6975 16C57.1272 16.2005 57.5712 16.401 58.0295 16.6016C58.4879 16.7734 58.9176 16.931 59.3186 17.0742C59.7196 17.2174 60.0061 17.3034 60.178 17.332C60.5217 17.8763 60.7079 18.3776 60.7366 18.8359C60.7652 19.2656 60.8368 19.724 60.9514 20.2109C60.7795 20.3542 60.6793 20.5977 60.6506 20.9414C60.622 21.2565 60.5933 21.4857 60.5647 21.6289C60.536 21.8581 60.4787 22.0013 60.3928 22.0586C60.3355 22.0872 60.2782 22.2018 60.2209 22.4023C60.1923 22.4596 60.1923 22.5456 60.2209 22.6602C60.2782 22.7747 60.2926 22.8607 60.2639 22.918ZM57.8783 29.6641C58.0788 29.0625 58.3939 28.5469 58.8236 28.1172C59.2819 27.6875 59.7689 27.3294 60.2845 27.043C60.8288 26.7279 61.3874 26.4701 61.9603 26.2695C62.5332 26.069 63.0775 25.8971 63.5931 25.7539C64.739 25.2669 65.9564 24.8086 67.2455 24.3789C68.5632 23.9206 69.8952 23.5195 71.2416 23.1758C72.6166 22.832 74.0202 22.6172 75.4525 22.5312C76.8848 22.4167 78.3887 22.5885 79.9642 23.0469C80.0502 23.3333 80.1791 23.6055 80.3509 23.8633C80.5228 24.1211 80.6947 24.3789 80.8666 24.6367C81.0671 24.8945 81.239 25.1523 81.3822 25.4102C81.5254 25.6393 81.6114 25.8828 81.64 26.1406C81.9265 26.3984 82.1556 26.6849 82.3275 27C82.4994 27.2865 82.528 27.6732 82.4134 28.1602C82.127 28.3893 81.8405 28.6042 81.5541 28.8047C81.2962 28.9766 81.0098 29.1341 80.6947 29.2773C79.6348 29.0195 78.5606 28.9336 77.472 29.0195C76.3835 29.1055 75.4095 29.1771 74.5502 29.2344C74.2923 28.9766 73.9772 28.8477 73.6048 28.8477C73.2611 28.8477 72.8887 28.9049 72.4877 29.0195C72.1153 29.1341 71.7285 29.2487 71.3275 29.3633C70.9551 29.4779 70.597 29.5065 70.2533 29.4492C69.9668 29.6784 69.6087 29.8359 69.1791 29.9219C68.778 29.9792 68.334 30.0365 67.847 30.0938C67.8184 30.237 67.847 30.3372 67.933 30.3945C68.0189 30.4232 68.0332 30.5091 67.9759 30.6523C68.1478 30.8529 68.3627 30.9961 68.6205 31.082C68.9069 31.168 69.1934 31.2539 69.4798 31.3398C69.7949 31.4258 70.0671 31.5404 70.2962 31.6836C70.5254 31.7982 70.683 31.9987 70.7689 32.2852C71.1986 32.2852 71.571 32.3854 71.8861 32.5859C72.2012 32.7865 72.459 33.0299 72.6595 33.3164C72.8601 33.6029 73.0033 33.918 73.0892 34.2617C73.2038 34.5768 73.2611 34.8633 73.2611 35.1211C73.347 35.3503 73.4473 35.4505 73.5619 35.4219C73.6765 35.3932 73.8054 35.4505 73.9486 35.5938C74.0345 35.9661 74.2494 36.3529 74.5931 36.7539C74.9369 37.1263 75.209 37.5417 75.4095 38C75.4668 38.7161 75.5098 39.3607 75.5384 39.9336C75.5671 40.4779 75.4668 41.0365 75.2377 41.6094C74.808 42.6693 74.2064 43.6146 73.433 44.4453C72.6882 45.276 71.8288 46.0208 70.8548 46.6797C69.9095 47.3099 68.8926 47.8542 67.8041 48.3125C66.7155 48.7708 65.6556 49.1576 64.6244 49.4727C64.5098 49.444 64.3952 49.444 64.2806 49.4727C64.166 49.5013 64.1374 49.4297 64.1947 49.2578C63.9655 49.4583 63.7077 49.5872 63.4212 49.6445C63.1634 49.7018 62.877 49.7161 62.5619 49.6875C62.2468 49.6875 61.9173 49.6732 61.5736 49.6445C61.2585 49.6159 60.9577 49.6302 60.6712 49.6875C60.4707 49.487 60.2845 49.2865 60.1127 49.0859C59.9694 48.9141 59.8548 48.6849 59.7689 48.3984C59.6257 48.3984 59.5541 48.3268 59.5541 48.1836C59.5827 48.0404 59.5397 47.9688 59.4252 47.9688C59.597 47.6823 59.6686 47.5247 59.64 47.4961C59.64 47.4388 59.597 47.3958 59.5111 47.3672C59.4538 47.3385 59.3965 47.3099 59.3392 47.2812C59.2819 47.224 59.2676 47.1523 59.2962 47.0664C59.4108 46.8372 59.4538 46.5794 59.4252 46.293C59.3965 45.9779 59.3679 45.6628 59.3392 45.3477C59.3106 45.0326 59.3249 44.7318 59.3822 44.4453C59.4681 44.1589 59.683 43.9297 60.0267 43.7578C61.0007 43.8724 61.9173 43.8438 62.7767 43.6719C63.6647 43.4714 64.4955 43.1992 65.2689 42.8555C66.0423 42.5117 66.7728 42.1393 67.4603 41.7383C68.1765 41.3372 68.8783 40.9792 69.5658 40.6641C69.6517 40.4062 69.7663 40.1914 69.9095 40.0195C70.0814 39.8477 70.2533 39.6901 70.4252 39.5469C70.597 39.4036 70.7546 39.2461 70.8978 39.0742C71.041 38.9023 71.1413 38.6875 71.1986 38.4297C71.2272 38.2292 71.1699 38.1146 71.0267 38.0859C70.9121 38.0286 70.8548 37.9141 70.8548 37.7422L70.3822 37.6133C69.8379 37.2982 69.222 37.0404 68.5345 36.8398C67.847 36.6107 67.2598 36.3672 66.7728 36.1094C66.4577 36.2812 66.1569 36.3242 65.8705 36.2383C65.6127 36.1523 65.2689 36.0664 64.8392 35.9805C63.8653 35.9232 62.9199 35.8229 62.0033 35.6797C61.1153 35.5365 60.2559 35.2786 59.4252 34.9062C59.3679 34.763 59.2962 34.6341 59.2103 34.5195C59.1244 34.4049 58.9668 34.3763 58.7377 34.4336C58.5658 34.2044 58.3939 33.9896 58.222 33.7891C58.0502 33.5599 57.8926 33.3164 57.7494 33.0586C57.8067 32.7148 57.8496 32.4284 57.8783 32.1992C57.9069 31.9414 57.821 31.6979 57.6205 31.4688C57.7351 31.0964 57.821 30.7956 57.8783 30.5664C57.9356 30.3372 57.9356 30.0365 57.8783 29.6641ZM101.662 47.5391C101.49 48.513 101.003 49.1862 100.201 49.5586C99.8284 49.5872 99.5419 49.5729 99.3414 49.5156C99.1695 49.4583 98.9833 49.3867 98.7828 49.3008C98.525 49.1862 98.2958 49.1146 98.0953 49.0859L97.6227 48.7422C97.5654 48.599 97.4938 48.4557 97.4078 48.3125C97.3219 48.1693 97.2216 48.026 97.107 47.8828C96.8779 47.5964 96.6487 47.2383 96.4195 46.8086C96.2477 45.9779 96.219 45.2904 96.3336 44.7461C96.4482 44.1732 96.5914 43.6146 96.7633 43.0703C96.8206 42.8984 96.8779 42.7266 96.9352 42.5547C96.9924 42.3542 97.0497 42.168 97.107 41.9961C96.3622 41.5951 95.8036 41.0221 95.4313 40.2773C95.0589 39.5326 94.844 38.8164 94.7867 38.1289C94.8727 37.5846 95.0302 37.1549 95.2594 36.8398C95.4885 36.4961 95.7464 36.224 96.0328 36.0234C96.3479 35.8229 96.663 35.6654 96.9781 35.5508C97.3219 35.4362 97.6513 35.3359 97.9664 35.25L98.525 35.4648C98.7828 35.7227 99.0406 35.9232 99.2984 36.0664C99.499 35.9805 99.6279 35.8516 99.6852 35.6797C99.7711 35.4792 99.8427 35.2643 99.9 35.0352C99.9859 34.7773 100.072 34.5195 100.158 34.2617C100.272 34.0039 100.401 33.7461 100.545 33.4883C100.516 33.1159 100.573 32.7721 100.716 32.457C100.516 32.3138 100.301 32.2279 100.072 32.1992C100.015 32.1992 99.8714 32.1706 99.6422 32.1133C99.2984 31.8555 99.0549 31.6406 98.9117 31.4688C98.7971 31.2682 98.6826 31.082 98.568 30.9102C98.3961 30.5378 98.1813 30.237 97.9234 30.0078L97.4938 29.707L97.7086 29.2773C97.7659 29.2201 97.7945 29.1484 97.7945 29.0625C97.7945 28.9766 97.7372 28.8477 97.6227 28.6758C97.5654 28.3607 97.5654 28.1458 97.6227 28.0312L97.7086 27.6016C97.9378 27.2865 98.0523 27.1146 98.0523 27.0859L98.4391 26.6992C99.012 26.556 99.5706 26.3984 100.115 26.2266C100.688 26.026 101.261 25.8255 101.834 25.625C102.378 25.4531 102.922 25.2812 103.466 25.1094C104.039 24.9089 104.612 24.737 105.185 24.5938C105.386 24.4505 105.601 24.3646 105.83 24.3359C106.059 24.2786 106.274 24.2357 106.474 24.207C106.646 24.1784 106.804 24.1641 106.947 24.1641C107.09 24.1354 107.19 24.0781 107.248 23.9922C107.591 23.8776 107.992 23.7487 108.451 23.6055C109.167 23.4049 110.112 23.1901 111.287 22.9609C112.461 22.7031 113.779 22.5026 115.24 22.3594L115.97 22.3164C116.114 22.3451 116.257 22.3594 116.4 22.3594C116.543 22.3307 116.686 22.3164 116.83 22.3164C118.119 22.3164 118.935 22.7031 119.279 23.4766C119.537 23.6198 119.766 23.7773 119.966 23.9492C120.167 24.1211 120.353 24.293 120.525 24.4648C120.611 24.5794 120.697 24.6797 120.783 24.7656C120.897 24.8516 120.983 24.9089 121.041 24.9375C121.528 25.6823 121.685 26.3411 121.513 26.9141C121.255 27.2865 120.926 27.5013 120.525 27.5586L120.052 27.8164C119.737 27.7878 119.494 27.7734 119.322 27.7734C119.179 27.7734 119.021 27.7734 118.849 27.7734C118.133 27.7734 117.302 27.8164 116.357 27.9023C115.412 27.9883 114.438 28.1172 113.435 28.2891C112.461 28.4323 111.516 28.6185 110.599 28.8477C109.683 29.0768 108.88 29.3203 108.193 29.5781L107.42 29.9648C107.219 30.2799 107.104 30.5378 107.076 30.7383C107.047 30.9102 107.018 31.082 106.99 31.2539C106.961 31.3685 106.933 31.4831 106.904 31.5977C106.904 31.7122 106.89 31.8411 106.861 31.9844C106.374 32.5859 106.13 33.3021 106.13 34.1328C105.93 34.4766 105.801 34.7344 105.744 34.9062C105.686 35.0495 105.686 35.2357 105.744 35.4648C106.288 35.694 106.804 35.7799 107.291 35.7227C107.778 35.6654 108.265 35.5938 108.752 35.5078C109.41 35.3932 110.084 35.293 110.771 35.207C111.487 35.1211 112.218 35.0781 112.963 35.0781H114.338L113.994 35.4219L114.209 36.0234C114.38 36.1094 114.495 36.1667 114.552 36.1953C114.638 36.224 114.724 36.2669 114.81 36.3242L115.025 36.7109C115.14 36.7682 115.24 36.8685 115.326 37.0117C115.44 37.1549 115.512 37.3698 115.541 37.6562L113.779 40.1484L113.177 40.3203C112.69 40.2917 112.261 40.349 111.888 40.4922C111.688 40.5495 111.487 40.6068 111.287 40.6641C111.086 40.6927 110.871 40.707 110.642 40.707C110.069 40.8216 109.582 40.9076 109.181 40.9648C108.809 41.0221 108.422 41.0794 108.021 41.1367C107.505 41.194 107.004 41.2799 106.517 41.3945C106.03 41.4805 105.572 41.6094 105.142 41.7812C104.856 41.7812 104.655 41.7812 104.541 41.7812C104.311 41.7812 104.068 41.8242 103.81 41.9102C103.581 41.9674 103.366 42.0247 103.166 42.082C103.022 42.1966 102.922 42.3255 102.865 42.4688C102.808 42.5833 102.75 42.7122 102.693 42.8555C102.578 43.2565 102.421 43.5859 102.22 43.8438V44.4883C101.991 44.7747 101.848 45.0039 101.791 45.1758C101.762 45.319 101.719 45.4622 101.662 45.6055C101.604 45.6914 101.561 45.7773 101.533 45.8633C101.504 45.9206 101.49 45.9922 101.49 46.0781C101.719 46.5078 101.776 46.9948 101.662 47.5391ZM125.659 45.9922C125.802 46.8516 125.745 47.5247 125.487 48.0117C125.258 48.4987 124.914 48.8568 124.456 49.0859C124.026 49.3438 123.525 49.487 122.952 49.5156C122.379 49.5443 121.835 49.5156 121.319 49.4297C121.033 49.0286 120.775 48.5273 120.546 47.9258C120.316 47.3242 120.102 46.7083 119.901 46.0781C119.701 45.4193 119.514 44.7747 119.342 44.1445C119.199 43.5143 119.07 42.9557 118.956 42.4688C119.099 42.125 119.185 41.7383 119.214 41.3086C119.271 40.8503 119.3 40.3919 119.3 39.9336C119.328 39.4753 119.342 39.0169 119.342 38.5586C119.371 38.0716 119.414 37.6133 119.471 37.1836C119.672 35.9805 119.958 34.8346 120.331 33.7461C120.732 32.6576 121.047 31.526 121.276 30.3516C121.333 30.0938 121.305 29.8503 121.19 29.6211C121.104 29.3919 121.09 29.1771 121.147 28.9766C121.176 28.862 121.262 28.7904 121.405 28.7617C121.548 28.7044 121.634 28.6042 121.663 28.4609C121.749 28.1458 121.763 27.888 121.706 27.6875C121.677 27.487 121.734 27.2435 121.878 26.957C122.021 26.7279 122.193 26.3984 122.393 25.9688C122.622 25.5104 122.708 25.0378 122.651 24.5508C122.909 24.3789 123.152 24.1784 123.382 23.9492C123.611 23.7201 123.84 23.5195 124.069 23.3477C124.327 23.1471 124.599 22.9753 124.885 22.832C125.201 22.6888 125.573 22.6172 126.003 22.6172C126.232 22.9036 126.375 23.2188 126.432 23.5625C126.518 23.9062 126.59 24.25 126.647 24.5938C126.733 24.9375 126.848 25.2669 126.991 25.582C127.134 25.8685 127.378 26.0977 127.721 26.2695C127.721 26.4987 127.721 26.7852 127.721 27.1289C127.721 27.4727 127.736 27.8164 127.764 28.1602C127.793 28.4753 127.85 28.776 127.936 29.0625C128.051 29.3203 128.223 29.4922 128.452 29.5781C127.936 30.9531 127.449 32.3138 126.991 33.6602C126.561 35.0065 126.203 36.3672 125.917 37.7422C125.63 39.0885 125.444 40.4492 125.358 41.8242C125.301 43.1992 125.401 44.5885 125.659 45.9922ZM140.332 41.1797C140.074 41.237 139.888 41.3945 139.773 41.6523C139.659 41.8815 139.544 42.125 139.43 42.3828C139.344 42.6406 139.243 42.8841 139.129 43.1133C139.043 43.3138 138.9 43.4141 138.699 43.4141C138.67 43.6432 138.584 43.8438 138.441 44.0156C138.327 44.1875 138.212 44.3737 138.098 44.5742C137.983 44.7461 137.897 44.9466 137.84 45.1758C137.782 45.3763 137.811 45.6198 137.926 45.9062C137.696 46.0781 137.553 46.3216 137.496 46.6367C137.439 46.9518 137.367 47.2526 137.281 47.5391C137.224 47.8255 137.109 48.069 136.937 48.2695C136.765 48.4701 136.45 48.556 135.992 48.5273C135.906 48.6419 135.892 48.7135 135.949 48.7422C136.006 48.7708 136.049 48.8711 136.078 49.043C135.763 48.9857 135.519 49 135.348 49.0859C135.204 49.2005 135.018 49.2721 134.789 49.3008C134.245 49.1289 133.786 48.8281 133.414 48.3984C133.07 47.9688 132.755 47.4961 132.469 46.9805C132.211 46.4362 131.967 45.8919 131.738 45.3477C131.538 44.8034 131.337 44.3307 131.137 43.9297C131.223 43.6146 131.237 43.3138 131.18 43.0273C131.122 42.7122 131.022 42.4544 130.879 42.2539C132.282 39.2747 133.815 36.0951 135.476 32.7148C137.138 29.3346 138.713 25.9974 140.203 22.7031C140.862 22.9609 141.506 23.2617 142.137 23.6055C142.795 23.9206 143.383 24.293 143.898 24.7227C144.443 25.1523 144.901 25.6536 145.273 26.2266C145.646 26.7708 145.889 27.3867 146.004 28.0742C145.946 28.2461 145.875 28.3177 145.789 28.2891C145.732 28.2318 145.674 28.2461 145.617 28.332C145.732 28.4753 145.789 28.5755 145.789 28.6328C145.818 28.6901 145.818 28.7474 145.789 28.8047C145.789 28.862 145.789 28.9479 145.789 29.0625C145.789 29.1484 145.832 29.2773 145.918 29.4492C145.803 29.4206 145.717 29.4349 145.66 29.4922C145.631 29.5495 145.545 29.5495 145.402 29.4922C145.517 29.8073 145.545 30.0651 145.488 30.2656C145.459 30.4661 145.402 30.6523 145.316 30.8242C145.23 30.9674 145.159 31.1393 145.101 31.3398C145.044 31.5117 145.058 31.7409 145.144 32.0273C145.058 32.0273 144.987 32.056 144.93 32.1133C144.901 32.1419 144.872 32.1849 144.844 32.2422C144.815 32.2708 144.772 32.3138 144.715 32.3711C144.686 32.3997 144.629 32.3997 144.543 32.3711C144.629 33.0013 144.657 33.6315 144.629 34.2617C144.6 34.8919 144.571 35.5365 144.543 36.1953C144.543 36.8255 144.557 37.4987 144.586 38.2148C144.614 38.9023 144.715 39.6185 144.887 40.3633C145.918 39.7617 146.734 38.9883 147.336 38.043C147.966 37.0977 148.467 36.0378 148.84 34.8633C149.241 33.6888 149.542 32.4284 149.742 31.082C149.943 29.7357 150.157 28.3607 150.387 26.957C150.644 26.6992 150.845 26.3841 150.988 26.0117C151.131 25.6393 151.26 25.2526 151.375 24.8516C151.489 24.4219 151.604 24.0065 151.719 23.6055C151.833 23.1758 151.976 22.7891 152.148 22.4453C152.578 22.5026 152.936 22.6458 153.223 22.875C153.538 23.0755 153.824 23.3047 154.082 23.5625C154.34 23.7917 154.612 24.0208 154.898 24.25C155.185 24.4505 155.543 24.5794 155.973 24.6367C156.316 25.1237 156.631 25.5964 156.918 26.0547C157.204 26.513 157.39 27 157.476 27.5156C157.333 27.7448 157.219 28.0026 157.133 28.2891C157.075 28.5755 157.004 28.862 156.918 29.1484C156.832 29.4349 156.717 29.707 156.574 29.9648C156.431 30.194 156.23 30.3945 155.973 30.5664C155.887 31.3112 155.772 31.9987 155.629 32.6289C155.514 33.2305 155.385 33.832 155.242 34.4336C155.127 35.0352 155.027 35.6654 154.941 36.3242C154.855 36.9544 154.827 37.6562 154.855 38.4297C154.626 39.0885 154.383 39.7904 154.125 40.5352C153.867 41.2799 153.667 41.9531 153.523 42.5547C153.065 42.9271 152.707 43.3711 152.449 43.8867C152.191 44.4023 151.919 44.918 151.633 45.4336C151.518 45.5482 151.446 45.5768 151.418 45.5195C151.389 45.4622 151.289 45.4193 151.117 45.3906C151.146 45.5052 151.146 45.5911 151.117 45.6484C151.088 45.7057 151.045 45.763 150.988 45.8203C150.959 45.849 150.931 45.9062 150.902 45.9922C150.902 46.0781 150.931 46.1927 150.988 46.3359C150.587 46.5078 150.229 46.7513 149.914 47.0664C149.599 47.3815 149.255 47.668 148.883 47.9258C148.539 48.1836 148.109 48.3555 147.594 48.4414C147.107 48.5273 146.462 48.4271 145.66 48.1406C144.486 47.2812 143.44 46.293 142.523 45.1758C141.635 44.0586 140.905 42.7266 140.332 41.1797ZM181.216 24.8086C181.244 25.0091 181.244 25.1667 181.216 25.2812C181.216 25.3672 181.201 25.4531 181.173 25.5391C181.173 25.625 181.173 25.7253 181.173 25.8398C181.173 25.9258 181.201 26.069 181.259 26.2695C180.657 27.2435 179.955 27.9167 179.153 28.2891C178.38 28.6328 177.535 28.8906 176.618 29.0625C175.701 29.2057 174.756 29.3633 173.782 29.5352C172.837 29.707 171.892 30.0794 170.946 30.6523C170.574 30.5091 170.23 30.5091 169.915 30.6523C169.629 30.7956 169.199 30.8385 168.626 30.7812C168.454 30.9531 168.239 31.082 167.981 31.168C167.724 31.2253 167.466 31.2969 167.208 31.3828C167.323 31.6406 167.366 31.9128 167.337 32.1992C167.337 32.457 167.38 32.6719 167.466 32.8438C168.468 32.9297 169.571 32.9154 170.774 32.8008C172.006 32.6862 173.209 32.6146 174.384 32.5859C174.412 32.7292 174.398 32.8294 174.341 32.8867C174.283 32.9154 174.269 32.987 174.298 33.1016C174.498 33.2448 174.699 33.431 174.899 33.6602C175.1 33.8607 175.3 34.0612 175.501 34.2617C175.701 34.4622 175.902 34.6341 176.102 34.7773C176.332 34.8919 176.589 34.9349 176.876 34.9062C176.991 35.1354 177.062 35.3932 177.091 35.6797C177.148 35.9375 177.119 36.2096 177.005 36.4961C176.547 36.8112 176.088 37.1406 175.63 37.4844C175.172 37.7995 174.685 38.0859 174.169 38.3438C173.682 38.6016 173.152 38.8164 172.579 38.9883C172.035 39.1315 171.419 39.1888 170.731 39.1602C170.588 39.1602 170.474 39.1602 170.388 39.1602C170.33 39.1602 170.244 39.1172 170.13 39.0312C169.901 39.1745 169.571 39.2174 169.142 39.1602C168.741 39.1029 168.425 39.1458 168.196 39.2891C167.881 39.1458 167.494 39.0885 167.036 39.1172C166.606 39.1172 166.22 39.0599 165.876 38.9453C165.418 39.5469 165.002 40.1914 164.63 40.8789C164.257 41.5664 163.928 42.2969 163.642 43.0703C164.616 43.2135 165.418 43.2708 166.048 43.2422C166.707 43.2135 167.323 43.1706 167.895 43.1133C168.468 43.0273 169.056 42.9557 169.657 42.8984C170.259 42.8125 171.018 42.7839 171.935 42.8125C172.507 42.4974 173.181 42.2969 173.954 42.2109C174.756 42.0964 175.487 41.9245 176.145 41.6953C176.375 41.7812 176.575 41.9388 176.747 42.168C176.919 42.3685 177.076 42.569 177.22 42.7695C177.392 42.9414 177.563 43.099 177.735 43.2422C177.907 43.3854 178.122 43.4427 178.38 43.4141C178.494 43.5286 178.566 43.6719 178.595 43.8438C178.652 43.987 178.695 44.1302 178.724 44.2734C178.752 44.4167 178.795 44.5456 178.852 44.6602C178.938 44.7461 179.067 44.7747 179.239 44.7461C178.81 45.6914 178.308 46.4219 177.735 46.9375C177.191 47.4245 176.561 47.7969 175.845 48.0547C175.129 48.3125 174.326 48.513 173.438 48.6562C172.579 48.7995 171.619 48.9714 170.56 49.1719C170.302 49.2292 170.087 49.2148 169.915 49.1289C169.743 49.0716 169.543 49.043 169.313 49.043C168.655 49.1862 167.867 49.3151 166.95 49.4297C166.033 49.5443 165.102 49.5872 164.157 49.5586C163.212 49.5299 162.31 49.401 161.45 49.1719C160.591 48.9714 159.889 48.599 159.345 48.0547C159.116 47.8542 158.958 47.625 158.872 47.3672C158.815 47.0807 158.629 46.8659 158.313 46.7227C158.285 46.3503 158.227 45.9349 158.142 45.4766C158.056 45.0182 157.97 44.5456 157.884 44.0586C157.798 43.543 157.726 43.0417 157.669 42.5547C157.64 42.0677 157.669 41.6237 157.755 41.2227C157.841 40.793 158.013 40.4062 158.27 40.0625C158.557 39.7188 158.657 39.3464 158.571 38.9453C158.714 38.9167 158.8 38.8451 158.829 38.7305C158.858 38.5872 158.972 38.5299 159.173 38.5586C159.345 38.043 159.531 37.556 159.731 37.0977C159.932 36.6393 160.132 36.1953 160.333 35.7656C160.562 35.3359 160.777 34.9062 160.977 34.4766C161.207 34.0182 161.422 33.5169 161.622 32.9727C161.221 32.6003 160.92 32.1992 160.72 31.7695C160.548 31.3112 160.419 30.8672 160.333 30.4375C160.247 29.9792 160.175 29.5208 160.118 29.0625C160.061 28.5755 159.961 28.0885 159.817 27.6016C160.104 27.1719 160.448 26.8281 160.849 26.5703C161.278 26.2839 161.737 26.0547 162.224 25.8828C162.711 25.7109 163.241 25.5677 163.813 25.4531C164.386 25.3385 164.988 25.2096 165.618 25.0664C166.764 24.694 167.781 24.4076 168.669 24.207C169.586 24.0065 170.474 23.849 171.333 23.7344C172.221 23.5911 173.138 23.4622 174.083 23.3477C175.028 23.2331 176.102 23.0612 177.306 22.832C177.563 23.0898 177.807 23.2188 178.036 23.2188C178.151 22.9609 178.28 22.8893 178.423 23.0039C178.595 23.0898 178.666 23.0039 178.638 22.7461C178.924 23.2331 179.282 23.6484 179.712 23.9922C180.17 24.3073 180.672 24.5794 181.216 24.8086ZM192.924 19.4375C192.924 19.6953 192.881 20.0104 192.795 20.3828C192.738 20.7552 192.68 21.1276 192.623 21.5C192.566 21.8724 192.552 22.2161 192.58 22.5312C192.609 22.8177 192.738 23.0039 192.967 23.0898C192.451 24.6081 192.093 25.8828 191.893 26.9141C191.721 27.9453 191.563 28.9336 191.42 29.8789C191.305 30.7956 191.148 31.7695 190.947 32.8008C190.747 33.832 190.389 35.0924 189.873 36.582C189.558 37.4987 189.171 38.1432 188.713 38.5156C188.255 38.8594 187.768 39.0312 187.252 39.0312C186.736 39.0312 186.206 38.888 185.662 38.6016C185.118 38.3151 184.617 38 184.158 37.6562C184.072 37.112 184.058 36.4531 184.115 35.6797C184.201 34.8776 184.302 34.0469 184.416 33.1875C184.531 32.3281 184.645 31.5117 184.76 30.7383C184.874 29.9362 184.96 29.263 185.018 28.7188C185.304 28.4036 185.505 28.1458 185.619 27.9453C185.734 27.7448 185.805 27.5299 185.834 27.3008C185.891 27.0716 185.934 26.7852 185.963 26.4414C185.992 26.0977 186.063 25.6107 186.178 24.9805C186.235 24.6654 186.206 24.3932 186.092 24.1641C186.006 23.9062 185.992 23.6628 186.049 23.4336C186.106 23.319 186.192 23.2331 186.307 23.1758C186.45 23.1185 186.536 23.0182 186.565 22.875C186.679 22.5026 186.708 22.2161 186.65 22.0156C186.593 21.7865 186.636 21.5143 186.779 21.1992C186.923 20.9701 187.094 20.612 187.295 20.125C187.524 19.6094 187.61 19.0794 187.553 18.5352C187.811 18.3346 188.054 18.1055 188.283 17.8477C188.512 17.5898 188.742 17.3607 188.971 17.1602C189.229 16.931 189.501 16.7448 189.787 16.6016C190.102 16.4583 190.475 16.3867 190.904 16.3867C191.134 16.7018 191.305 17.0026 191.42 17.2891C191.535 17.5755 191.635 17.8477 191.721 18.1055C191.835 18.3633 191.979 18.6068 192.15 18.8359C192.322 19.0651 192.58 19.2656 192.924 19.4375ZM188.67 43.8867C188.727 44.1159 188.77 44.3307 188.799 44.5312C188.828 44.7318 188.856 44.9466 188.885 45.1758C188.713 45.7773 188.527 46.3216 188.326 46.8086C188.24 47.0091 188.183 47.138 188.154 47.1953C188.126 47.2526 188.111 47.2956 188.111 47.3242C188.111 47.3529 188.126 47.3958 188.154 47.4531C188.183 47.4818 188.197 47.5964 188.197 47.7969L187.982 48.3125C187.839 48.513 187.667 48.6706 187.467 48.7852C187.295 48.8997 187.109 49 186.908 49.0859C186.822 49.1432 186.722 49.1862 186.607 49.2148C186.522 49.2721 186.45 49.3294 186.393 49.3867L186.264 49.9023L185.662 49.9883C185.204 50.1029 184.788 50.1602 184.416 50.1602H183.943C183.6 49.8451 183.328 49.6016 183.127 49.4297C182.927 49.2578 182.697 49.1003 182.44 48.957C182.124 48.4128 181.938 47.9401 181.881 47.5391C181.824 47.1667 181.752 46.9232 181.666 46.8086L181.065 46.207L181.58 45.8203L181.065 45.0039C181.408 44.7461 181.666 44.5599 181.838 44.4453C182.01 44.3307 182.153 44.2161 182.268 44.1016C182.411 43.9583 182.554 43.7865 182.697 43.5859C182.841 43.3854 183.07 43.056 183.385 42.5977L183.772 42.0391L184.287 42.3398C184.43 42.4258 184.688 42.5117 185.061 42.5977C185.462 42.6549 185.805 42.7122 186.092 42.7695C186.55 42.9128 186.994 43.0273 187.424 43.1133C187.882 43.1706 188.24 43.3138 188.498 43.543L188.67 43.8867Z"
                  fill="white"
                />
                <g style={{ mixBlendMode: 'darken' }}>
                  <rect x="180" y="41" width="11" height="10" fill="#1CE783" />
                </g>
              </svg>
            </a>
          </Link>
          <div className="block lg:hidden ">
            <button
              id="nav"
              className="flex items-center px-3 py-2 border-2 rounded text-white border-custom-green hover:text-white hover:border-custom-green"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          {/* Searchbox */}
          <div className="text-white hidden ml-14 lg:flex lg:min-w-80 self-center">
            <input
              className="border-b-2 border-white text-white bg-transparent h-10 py-2 px-4 text-md focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button type="submit" className="absolute right-0 top-0 mt-3 mr-2" />
          </div>
        </div>

        <div className="w-full lg:flex lg:items-center lg:w-auto px-8 lg:px-0">
          <NavButtons className={'flex'} />
        </div>
      </div>
    </nav>
  )
}

const NavButtons = ({ className }) => {
  const auth = useAuth()
  const [mounted, setMounted] = useState(false)
  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className={className}>
      {auth && auth.user ? (
        <div className="flex">
          <Link href={'/template'}>
            <TertiaryBtn mono={true}>Template</TertiaryBtn>
          </Link>
          <Link href={'/create'}>
            <PrimaryBtn>
              <IoCreate size={18} className={'fill-current inline-flex self-center mr-2'} /> Meme
            </PrimaryBtn>
          </Link>
          <Link href={'/profile'}>
            <SecondaryBtn mono={true}>
              <IoPerson size={18} className={'fill-current inline-flex self-center mr-2'} /> Profile
            </SecondaryBtn>
          </Link>
        </div>
      ) : (
        <div className={'flex'}>
          <Link href={'/login'}>
            <TertiaryBtn inverted={true}>
              <IoLogIn size={18} className={'fill-current inline-flex self-center mr-2'} /> Log in
            </TertiaryBtn>
          </Link>
          <Link href={'/signup'}>
            <PrimaryBtn>Sign up</PrimaryBtn>
          </Link>
        </div>
      )}
    </div>
  )
}

NavButtons.propTypes = {
  className: PropTypes.string,
}
