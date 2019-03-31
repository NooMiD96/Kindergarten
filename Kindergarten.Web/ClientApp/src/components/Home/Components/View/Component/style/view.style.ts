import styled from "styled-components";

export default styled.div`
    padding: 15px;

    @media (max-width: 768px) {
        .ant-layout-header, .ant-layout-footer {
            padding: 0;
        }
    }

    h1 {
        display: inline-block;
    }

    .ant-layout-header {
        background-color: #f0f2f5;
    }

    .ant-card-body {
        padding: 0;
    }

    .ant-input-affix-wrapper .ant-input:not(:last-child) {
        padding-right: 70px;
    }

    .ant-input-affix-wrapper .ant-input-suffix {
        right: 0px;
    }

    .ant-layout-content {
        margin: 20px 0;
    }

    .card-image {
        float: left;
        width: 45%;
        margin-right: 15px;

        .card-image-img {
            width: 100%;
        }
    }

    .post-inner-with-image {
        margin-bottom: 5px;
    }

    .control-row {
        margin-top: 10px;
    }

    .home-publish-view-add_comment-message_icon {
        color: rgba(0,0,0,.25);
    }
`;
