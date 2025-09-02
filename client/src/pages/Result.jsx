import React, { useContext, useState } from 'react'
import { FileUploadDemo } from '../components/fileupload'
import { Component } from '../components/smallinput'
import { AppContext } from '../context/AppContext'

export const Result = () => {
  const { resultImage, image, removeBg } = useContext(AppContext)
  const [localImage, setLocalImage] = useState(null)
  const [loading, setLoading] = useState(false)

  // Handler for file upload (from FileUploadDemo or smallinput)
  const handleFileUpload = (files) => {
    if (files && files.length > 0) {
      setLocalImage(files[0])
    }
  }

  // Handler for Push button
  const handlePush = async () => {
    if (localImage) {
      setLoading(true)
      await removeBg(localImage)
      setLoading(false)
    }
  }

  // Handler for Download button
  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a')
      link.href = resultImage
      link.download = 'result.png'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className='result w-full h-[32rem] sm:flex sm:justify-center sm:flex-col sm:items-center'>
      <div className='result-window w-[80rem] h-[32rem] sm:flex sm:justify-center sm:flex-col sm:items-center gap-7 border border-dashed border-gray-400/30'>
        <div className='hidden sm:flex input-output w-[50%] h-[30%] mx-5 my-2 '>
          {/* Pass handleFileUpload to FileUploadDemo */}
          <FileUploadDemo onFileUpload={handleFileUpload} />
        </div>
        <div className='smalliop sm:hidden m-4'>
          <Component onFileUpload={handleFileUpload} />
        </div>
        <div className='buttonslarge sm:flex sm:justify-center sm:items-center w-[50%] h-[58%] rounded-2xl gap-5 m-2'>
          {/* Show Push button only if image is uploaded and not loading/resultImage */}
          {localImage && !loading && !resultImage && (
            <button
              type='button'
              className='bg-amber-50 text-black w-[100px] h-[40px] rounded-2xl font-[mooxy]'
              onClick={handlePush}
            >
              Push
            </button>
          )}
          {/* Show loading text while processing */}
          {loading && (
            <span className='text-lg font-[mooxy]'>Loading...</span>
          )}
          {/* Show Download button only if resultImage is available and not loading */}
          {resultImage && !loading && (
            <button
              type='button'
              className='bg-amber-50 text-black w-[100px] h-[40px] rounded-2xl font-[mooxy]'
              onClick={handleDownload}
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
