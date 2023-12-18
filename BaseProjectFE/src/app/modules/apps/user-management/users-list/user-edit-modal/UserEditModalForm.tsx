import { ChangeEvent, FC, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { isNotEmpty, toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import { initialUser, Role, User } from '../core/_models'
import clsx from 'clsx'
import { useListView } from '../core/ListViewProvider'
import { UsersListLoading } from '../components/loading/UsersListLoading'
import { createUser, getRoles, updateUser } from '../core/_requests'
import { useQueryResponse } from '../core/QueryResponseProvider'


type Props = {
  isUserLoading: boolean
  user: User
}
const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const editUserSchema = Yup.object().shape({
  email: Yup.string()
    .email('Sai định dạng Email')
    .min(3, 'Số ký tự phải lớn hơn 3')
    .max(50, 'Số ký tự phải nhỏ hơn 50')
    .required('Email không được để trống'),
  phone_number:
    Yup.string()
      .matches(regexPhoneNumber, 'Sai định dạng số điện thoại')
      .min(6, 'Số ký tự phải lớn hơn 6')
      .max(14, 'Số ký tự phải nhỏ hơn 11')
      .required('Số điện thoại không được để trống'),
})

const UserEditModalForm: FC<Props> = ({ user, isUserLoading }) => {
  const { setItemIdForUpdate } = useListView()
  const { refetch } = useQueryResponse()

  const [userForEdit] = useState<User>({
    ...user,
    avatar: user.avatar || initialUser.avatar,
    role: user.role || initialUser.role,
    position: user.position || initialUser.position,
    name: user.name || initialUser.name,
    first_name: user.first_name || initialUser.first_name,
    last_name: user.last_name || initialUser.last_name,
    email: user.email || initialUser.email,
    phone_number: user.phone_number || initialUser.phone_number,
  })

  const API_URL = process.env.REACT_APP_MEDIA_URL
  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
  // const userAvatarImg = userForEdit.avatar_remove ? blankImg : (avatarPreview ?? `${API_URL}/${userForEdit.avatar}`);

  const cancel = (withRefresh?: boolean) => {
    if (withRefresh) {
      refetch()
    }
    setItemIdForUpdate(undefined)
  }

  const [avatarPreview, setAvatarPreview] = useState<boolean>(false);
  const [userAvatarImg, setUserAvatartImg] = useState<string | null>(`${API_URL}/${userForEdit.avatar}`)
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    userForEdit.avatar_remove = false;
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFileAvatar(file);
      const reader = new FileReader();

      reader.onload = function (e) {
        setUserAvatartImg(e.target?.result as string);
        setAvatarPreview(true);
      };

      reader.readAsDataURL(file);
    } else {
      setFileAvatar(null);
      resetPreview()
    }
  };
  const resetPreview = () => {
    setUserAvatartImg(`${API_URL}/${userForEdit.avatar}`);
    setAvatarPreview(false);
  };
  const cancelFileChange = () => {
    // Reset the preview and clear the file input
    if (avatarPreview) {
      resetPreview();
      userForEdit.avatar_remove = false;
    }
    else {
      setUserAvatartImg(blankImg);
      setAvatarPreview(true);
      userForEdit.avatar_remove = true;
    }
  };


  const formik = useFormik({
    initialValues: userForEdit,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
        if (isNotEmpty(values.id)) {
          await updateUser(values, fileAvatar)
        } else {
          await createUser(values, fileAvatar)
        }
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  const [roles, setRoles] = useState<Role[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await getRoles();
        setRoles(response);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <form id='kt_modal_add_user_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        {/* begin::Scroll */}
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies='#kt_modal_add_user_header'
          data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
          data-kt-scroll-offset='300px'
        >
          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='d-block fw-bold fs-6 mb-5'>Ảnh đại diện</label>
            {/* end::Label */}

            {/* begin::Image input */}
            <div
              className='image-input image-input-outline'
              data-kt-image-input='true'
              style={{ backgroundImage: `url('${blankImg}')` }}
            >
              {/* begin::Preview existing avatar */}
              <div
                className='image-input-wrapper w-125px h-125px'
                style={{ backgroundImage: `url('${userAvatarImg}')` }}
              ></div>
              {/* end::Preview existing avatar */}

              {/* begin::Label */}
              <label
                className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                data-kt-image-input-action='change'
                data-bs-toggle='tooltip'
                title='Thay đổi avatar'
              >
                <i className='bi bi-pencil-fill fs-7'></i>
                <input
                  type='file'
                  name='avatar'
                  accept='.png, .jpg, .jpeg'
                  onChange={handleFileChange}
                />

                <input type='hidden' name='avatar_remove' />
              </label>
              {/* end::Label */}

              {userForEdit.avatar && (
                /* begin::Remove */
                <span
                  className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                  data-kt-image-input-action='remove'
                  data-bs-toggle='tooltip'
                  title='Remove avatar'
                  onClick={cancelFileChange}
                >
                  {avatarPreview ? (
                    <i className='bi bi-x fs-2'></i>
                  ) : (
                    <i className='bi bi-trash fs-2'></i>
                  )}

                </span>
                /* end::Remove */
              )}

            </div>
            {/* end::Image input */}

            {/* begin::Hint */}
            <div className='form-text'>Định dạng chấp nhận: png, jpg, jpeg.</div>
            {/* end::Hint */}
          </div>
          {/* end::Input group */}

          <div className='row'>
            {/* First Name Input group */}
            <div className='col-md-6 mb-7'>
              <div className='fv-row'>
                <label className='fw-bold fs-6 mb-2'>Họ</label>
                <input
                  placeholder='Họ'
                  {...formik.getFieldProps('first_name')}
                  type='text'
                  name='first_name'
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    { 'is-invalid': formik.touched.first_name && formik.errors.first_name },
                    { 'is-valid': formik.touched.first_name && !formik.errors.first_name }
                  )}
                  autoComplete='off'
                  disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.first_name && formik.errors.first_name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.first_name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Last Name Input group */}
            <div className='col-md-6 mb-7'>
              <div className='fv-row'>
                <label className='fw-bold fs-6 mb-2'>Tên</label>
                <input
                  placeholder='Tên'
                  {...formik.getFieldProps('last_name')}
                  type='text'
                  name='last_name'
                  className={clsx(
                    'form-control form-control-solid mb-3 mb-lg-0',
                    { 'is-invalid': formik.touched.last_name && formik.errors.last_name },
                    { 'is-valid': formik.touched.last_name && !formik.errors.last_name }
                  )}
                  autoComplete='off'
                  disabled={formik.isSubmitting || isUserLoading}
                />
                {formik.touched.last_name && formik.errors.last_name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.last_name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>


          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Email</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Email'
              {...formik.getFieldProps('email')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.email && formik.errors.email },
                {
                  'is-valid': formik.touched.email && !formik.errors.email,
                }
              )}
              type='email'
              name='email'
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {/* end::Input */}
            {formik.touched.email && formik.errors.email && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formik.errors.email}</span>
              </div>
            )}
          </div>
          {/* end::Input group */}
          {/* begin::Input group */}
          <div className='fv-row mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-2'>Điện thoại</label>
            {/* end::Label */}

            {/* begin::Input */}
            <input
              placeholder='Phone'
              {...formik.getFieldProps('phone_number')}
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                { 'is-invalid': formik.touched.phone_number && formik.errors.phone_number },
                {
                  'is-valid': formik.touched.phone_number && !formik.errors.phone_number,
                }
              )}
              type='phone_number'
              name='phone_number'
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading}
            />
            {/* end::Input */}
            {formik.touched.phone_number && formik.errors.phone_number && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formik.errors.phone_number}</span>
              </div>
            )}
          </div>
          {/* end::Input group */}
          {/* begin::Input group */}
          <div className='mb-7'>
            {/* begin::Label */}
            <label className='required fw-bold fs-6 mb-5'>Phân quyền</label>
            {/* end::Label */}
            {/* begin::Roles */}
            {roles?.map((role, index) => (
              <>
                {/* begin::Input row */}
                <div key={index}>
                  <div className='separator separator-dashed my-5'></div>
                  <div className='d-flex fv-row'>
                    {/* begin::Radio */}
                    <div className='form-check form-check-custom form-check-solid'>
                      {/* begin::Input */}
                      <input
                        className='form-check-input me-3'
                        {...formik.getFieldProps('role')}
                        name='role'
                        type='radio'
                        value={role.Name}
                        id={`kt_modal_update_role_option_${index}`}
                        checked={formik.values.role === role.Name}
                        disabled={formik.isSubmitting || isUserLoading}
                      />

                      {/* end::Input */}
                      {/* begin::Label */}
                      <label className='form-check-label' htmlFor={`kt_modal_update_role_option_${index}`}>
                        <div className='fw-bolder text-gray-800'>{role.Name}</div>
                        <div className='text-gray-600'>
                          {role.Description}
                        </div>
                      </label>
                      {/* end::Label */}
                    </div>
                    {/* end::Radio */}
                  </div>
                </div>

                {/* end::Input row */}
              </>
            ))}
            {/* end::Roles */}
          </div>
          {/* end::Input group */}
        </div>
        {/* end::Scroll */}

        {/* begin::Actions */}
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            data-kt-users-modal-action='cancel'
            disabled={formik.isSubmitting || isUserLoading}
          >
            Hủy
          </button>

          <button
            type='submit'
            className='btn btn-primary'
            data-kt-users-modal-action='submit'
            disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Gửi</span>
            {(formik.isSubmitting || isUserLoading) && (
              <span className='indicator-progress'>
                Xin đợi...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        {/* end::Actions */}
      </form>
      {(formik.isSubmitting || isUserLoading) && <UsersListLoading />}
    </>
  )
}

export { UserEditModalForm }
