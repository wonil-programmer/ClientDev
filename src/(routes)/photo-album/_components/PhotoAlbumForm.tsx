import DescriptionInputs from './DescriptionInputs';
import FileInput from './FileInput';
import OvalButton from '../../../_components/button/OvalButton';
import { Dispatch, SetStateAction } from 'react';
import { IUploadedFileDto, IExistingFileDto, IPhotoAlbumDescriptionValues } from '../types';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import LoadingSpinner from '../../../_components/loadingSpinner/LoadingSpinner';

interface IProps {
    files: (IExistingFileDto | IUploadedFileDto)[];
    setFiles: Dispatch<SetStateAction<(IExistingFileDto | IUploadedFileDto)[]>>;
    onSubmit: SubmitHandler<IPhotoAlbumDescriptionValues>;
    isPending: boolean;
    existingPostData?: IPhotoAlbumDescriptionValues;
    existingFileIds?: number[];
    setExistingFileIds?: Dispatch<SetStateAction<number[]>>;
}

// 앨범 작성 폼 컴포넌트 (작성 및 수정시 사용)
export default function PhotoAlbumForm({
    files,
    setFiles,
    onSubmit,
    isPending,
    existingPostData,
    existingFileIds,
    setExistingFileIds,
}: IProps) {
    const methods = useForm<IPhotoAlbumDescriptionValues>({
        mode: 'onBlur',
        defaultValues: { title: existingPostData?.title, bodyContent: existingPostData?.bodyContent },
    });

    return (
        <div
            className={`FormWrapper h-[40rem] w-[42rem] rounded-3xl bg-white
                   p-8 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]`}
        >
            <FormProvider {...methods}>
                <form className='h-full' onSubmit={methods.handleSubmit(onSubmit)} encType='multipart/form-data'>
                    <div className={'flex h-full w-full flex-row'}>
                        <div className={'h-full w-1/2'}>
                            <FileInput
                                files={files}
                                setFiles={setFiles}
                                existingFileIds={existingFileIds}
                                setExistingFileIds={setExistingFileIds}
                            />
                        </div>
                        <div className={'ml-5 flex w-1/2 flex-col justify-center'}>
                            <div className='mb-2 ml-4 font-semibold'>사진 총 {files?.length} 장</div>
                            <DescriptionInputs />
                            <div className={'flex justify-end'}>
                                <OvalButton
                                    content={
                                        isPending ? <LoadingSpinner size={24} /> : existingPostData ? '수정' : '게시'
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
